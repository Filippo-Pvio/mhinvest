import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-1024x768', width: 1024, height: 768 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'small-mobile-320x568', width: 320, height: 568 }
];

await mkdir('screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const requestFailures = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('requestfailed', (request) => requestFailures.push(`${request.url()}: ${request.failure()?.errorText}`));
  const response = await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const metrics = await page.evaluate(() => ({
    title: document.title,
    status: document.readyState,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    heroHeight: Math.round(document.querySelector('.hero')?.getBoundingClientRect().height || 0),
    h1Lines: Math.round((document.querySelector('h1')?.getBoundingClientRect().height || 0) / parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)),
    imageLoaded: document.querySelector('.hero-media')?.complete && document.querySelector('.hero-media')?.naturalWidth > 0,
    primaryCtaVisible: Boolean(document.querySelector('.button-primary')?.getBoundingClientRect().width),
    primaryCtaAboveFold: (document.querySelector('.button-primary')?.getBoundingClientRect().bottom || Infinity) <= window.innerHeight,
    h1Text: document.querySelector('h1')?.textContent?.trim(),
    textOverflowOffenders: [...document.querySelectorAll('h1, h2, h3, p, a, button, li, strong, small')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && (rect.left < -0.5 || rect.right > window.innerWidth + 0.5);
      })
      .map((element) => `${element.tagName.toLowerCase()}.${element.className || 'no-class'}: ${element.textContent?.trim().slice(0, 70)}`)
  }));

  let menuWorks = null;
  if (viewport.width <= 1024) {
    await page.locator('.menu-toggle').click();
    menuWorks = await page.locator('.mobile-nav').isVisible();
    await page.keyboard.press('Escape');
    await page.locator('.menu-toggle').click();
  }

  await page.screenshot({ path: `screenshots/browser-${viewport.name}-v2.png`, fullPage: true });
  results.push({ viewport, httpStatus: response?.status(), ...metrics, horizontalOverflow: metrics.pageWidth > metrics.viewportWidth, menuWorks, consoleErrors, requestFailures });
  await page.close();
}

await browser.close();
await writeFile('screenshots/qa-results.json', `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));

const failures = results.filter((result) => result.httpStatus !== 200 || result.horizontalOverflow || !result.imageLoaded || !result.primaryCtaVisible || !result.primaryCtaAboveFold || result.textOverflowOffenders.length || result.consoleErrors.length || result.requestFailures.length || result.menuWorks === false);
if (failures.length) process.exitCode = 1;
