import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const baseUrl = 'http://127.0.0.1:8765';
const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-1024x768', width: 1024, height: 768 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'small-mobile-320x568', width: 320, height: 568 }
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const primary = document.querySelector('.button-primary');
    const text = [...document.querySelectorAll('h1, h2, h3, p, a, summary, strong')].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && rect.width > 0 && rect.height > 0;
    });
    return {
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      primaryAboveFold: primary.getBoundingClientRect().bottom <= innerHeight,
      imagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
      anchorsResolve: [...document.querySelectorAll('a[href^="#"]')].every((link) => Boolean(document.querySelector(link.getAttribute('href')))),
      clippedText: text.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left < -.5 || rect.right > innerWidth + .5 || element.scrollWidth > element.clientWidth + 1;
      }).map((element) => element.textContent.trim().slice(0, 60))
    };
  });

  if (viewport.width <= 1024) {
    await page.locator('.menu-toggle').click();
    if (!await page.locator('.mobile-nav').isVisible()) errors.push('Mobile navigation did not open');
    await page.keyboard.press('Escape');
  }

  if (response?.status() !== 200 || result.pageWidth > result.viewportWidth || !result.primaryAboveFold || !result.imagesLoaded || !result.anchorsResolve || result.clippedText.length || errors.length) {
    failures.push({ viewport, response: response?.status(), ...result, errors });
  }
  await context.close();
}

const motionContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'no-preference'
});
const motionPage = await motionContext.newPage();
const motionErrors = [];
motionPage.on('console', (message) => { if (message.type() === 'error') motionErrors.push(message.text()); });
motionPage.on('pageerror', (error) => motionErrors.push(error.message));
await motionPage.goto(baseUrl, { waitUntil: 'networkidle' });
await motionPage.locator('.process-step').nth(1).scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(180);
const processMotion = await motionPage.locator('.process-list').evaluate((element) => ({
  enhanced: document.documentElement.classList.contains('motion-ready'),
  progress: Number.parseFloat(getComputedStyle(element).getPropertyValue('--diagnostic-progress')) || 0,
  activeSteps: element.querySelectorAll('.is-current, .is-complete').length
}));
await motionPage.locator('.contact-section').scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(180);
const contactMotion = await motionPage.locator('.contact-target').evaluate((element) => element.classList.contains('is-visible'));
if (!processMotion.enhanced || processMotion.progress <= 0 || processMotion.activeSteps < 1 || !contactMotion || motionErrors.length) {
  failures.push({ viewport: 'motion-desktop', processMotion, contactMotion, errors: motionErrors });
}
await motionContext.close();

await browser.close();
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log('Customer demo passed all five browser viewports.');
}
