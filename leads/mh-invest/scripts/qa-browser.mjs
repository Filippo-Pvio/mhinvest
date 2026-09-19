import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const baseUrl = 'http://127.0.0.1:4321/mhinvest/';
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

const inspectPage = async (page) => page.evaluate(() => {
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
  };
  const textElements = [...document.querySelectorAll('h1, h2, h3, p, a, summary, li, strong, small')].filter(visible);
  const interactiveElements = [...document.querySelectorAll('a, button, summary')].filter(visible);
  const internalLinks = [...document.querySelectorAll('a[href^="#"]')].map((link) => link.getAttribute('href'));
  const hero = document.querySelector('.hero');
  const h1 = document.querySelector('h1');
  const primary = document.querySelector('.button-primary');
  const secondary = document.querySelector('.button-secondary');

  return {
    title: document.title,
    readyState: document.readyState,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    heroHeight: Math.round(hero?.getBoundingClientRect().height || 0),
    h1Lines: h1 ? Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)) : 0,
    h1Animation: h1 ? getComputedStyle(h1).animationName : 'missing',
    animatedContentVisible: Boolean(h1 && primary && Number(getComputedStyle(h1).opacity) > .99 && Number(getComputedStyle(primary).opacity) > .99),
    allImagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
    primaryCtaVisible: Boolean(primary && visible(primary)),
    primaryCtaAboveFold: (primary?.getBoundingClientRect().bottom || Infinity) <= window.innerHeight,
    primaryCtaHref: primary?.getAttribute('href'),
    secondaryCtaVisible: Boolean(secondary && visible(secondary)),
    secondaryCtaHref: secondary?.getAttribute('href'),
    internalLinksResolve: internalLinks.every((href) => href === '#' || href === '#top' || Boolean(document.querySelector(href))),
    internalLinks: [...new Set(internalLinks)],
    textOverflowOffenders: textElements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < -0.5 || rect.right > window.innerWidth + 0.5 || element.scrollWidth > element.clientWidth + 1;
    }).map((element) => `${element.tagName.toLowerCase()}.${element.className || 'no-class'}: ${element.textContent?.trim().slice(0, 70)}`),
    clippedElements: [...document.querySelectorAll('header, main, section, nav, article, footer')].filter(visible).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < -0.5 || rect.right > window.innerWidth + 0.5;
    }).map((element) => `${element.tagName.toLowerCase()}.${element.className || element.id || 'no-class'}`),
    touchTargetOffenders: interactiveElements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    }).map((element) => `${element.tagName.toLowerCase()}.${element.className || 'no-class'} ${Math.round(element.getBoundingClientRect().width)}x${Math.round(element.getBoundingClientRect().height)}`)
  };
});

const checkFocus = async (locator) => {
  await locator.focus();
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      focusVisible: element.matches(':focus-visible'),
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth
    };
  });
};

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const errorResponses = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('requestfailed', (request) => requestFailures.push(`${request.url()}: ${request.failure()?.errorText}`));
  page.on('response', (response) => { if (response.status() >= 400) errorResponses.push(`${response.status()} ${response.url()}`); });

  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const metrics = await inspectPage(page);
  const focusState = await checkFocus(page.locator('.button-primary'));
  const motionState = await page.evaluate(() => ({
    heroAnimation: getComputedStyle(document.querySelector('.hero-media')).animationName,
    heroAnimationState: document.querySelector('.hero-media').getAnimations().map((animation) => animation.playState),
    processMotionSupported: CSS.supports('animation-timeline', 'view()')
  }));

  let menuWorks = true;
  let keyboardNavigationWorks = true;
  let navigationOverflowOffenders = [];
  if (viewport.width <= 1024) {
    const toggle = page.locator('.menu-toggle');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    menuWorks = await page.locator('.mobile-menu').evaluate((element) => element.open) && await page.locator('.mobile-nav').isVisible();
    navigationOverflowOffenders = await page.locator('.mobile-nav').evaluate((navigation) => [...navigation.querySelectorAll('a, summary')]
      .filter((element) => element.scrollWidth > element.clientWidth + 1 || element.getBoundingClientRect().right > window.innerWidth + .5)
      .map((element) => element.textContent?.trim()));
    keyboardNavigationWorks = await page.evaluate(() => Boolean(document.activeElement?.matches('.mobile-nav summary, .mobile-nav a')));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(50);
    keyboardNavigationWorks = keyboardNavigationWorks
      && !await page.locator('.mobile-menu').evaluate((element) => element.open)
      && await toggle.evaluate((element) => element === document.activeElement);
  } else {
    const summary = page.locator('.nav-group summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    const opened = await page.locator('.nav-group').evaluate((element) => element.open);
    navigationOverflowOffenders = await page.locator('.nav-panel').evaluate((navigation) => [...navigation.querySelectorAll('a')]
      .filter((element) => element.scrollWidth > element.clientWidth + 1 || element.getBoundingClientRect().right > window.innerWidth + .5)
      .map((element) => element.textContent?.trim()));
    await page.keyboard.press('Tab');
    const childFocused = await page.locator('.nav-panel a').first().evaluate((element) => element === document.activeElement);
    await page.keyboard.press('Escape');
    keyboardNavigationWorks = opened && childFocused
      && !await page.locator('.nav-group').evaluate((element) => element.open)
      && await summary.evaluate((element) => element === document.activeElement);
  }

  await page.locator('.process-step').nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const processMotion = await page.locator('.process-step').nth(1).evaluate((element) => ({
    animationName: getComputedStyle(element).animationName,
    opacity: Number(getComputedStyle(element).opacity),
    active: element.classList.contains('is-current') || element.classList.contains('is-complete'),
    progress: Number.parseFloat(getComputedStyle(element.closest('.process-list')).getPropertyValue('--diagnostic-progress')) || 0
  }));
  await page.locator('.contact-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(180);
  const contactMotion = await page.locator('.contact-target').evaluate((element) => ({
    visible: element.classList.contains('is-visible'),
    targetTransform: getComputedStyle(element.querySelector('span')).transform
  }));
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(100);
  await page.screenshot({ path: `screenshots/browser-${viewport.name}-v3.png`, fullPage: true, animations: 'disabled' });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  const reducedMotion = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const style = getComputedStyle(h1);
    return {
      matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      duration: style.animationDuration,
      visible: Number(style.opacity) > .99 && h1.getBoundingClientRect().height > 0
    };
  });

  results.push({
    viewport,
    httpStatus: response?.status(),
    ...metrics,
    horizontalOverflow: metrics.pageWidth > metrics.viewportWidth,
    menuWorks,
    keyboardNavigationWorks,
    navigationOverflowOffenders,
    focusState,
    motionState,
    processMotion,
    contactMotion,
    reducedMotion,
    consoleErrors,
    requestFailures,
    errorResponses
  });
  await context.close();
}

const noJsResults = [];
for (const viewport of [viewports[0], viewports[4]]) {
  const context = await browser.newContext({ viewport, javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
  let nativeMenuWorks = true;
  if (viewport.width <= 1024) {
    await page.locator('.menu-toggle').click();
    nativeMenuWorks = await page.locator('.mobile-nav').isVisible();
  }
  noJsResults.push({
    viewport: viewport.name,
    httpStatus: response?.status(),
    contentVisible: await page.locator('h1').isVisible() && await page.locator('.button-primary').isVisible(),
    nativeMenuWorks
  });
  await context.close();
}

await browser.close();
const report = { generatedAt: new Date().toISOString(), results, noJsResults };
await writeFile('screenshots/qa-results.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

const failures = results.filter((result) => {
  const reducedDurationSeconds = Number.parseFloat(result.reducedMotion.duration || '1');
  const enforceTouchTargets = result.viewport.width <= 390;
  return result.httpStatus !== 200
    || result.horizontalOverflow
    || !result.allImagesLoaded
    || !result.primaryCtaVisible
    || !result.animatedContentVisible
    || !result.primaryCtaAboveFold
    || result.primaryCtaHref !== '#kontakt'
    || !result.secondaryCtaVisible
    || result.secondaryCtaHref !== '#leistungen'
    || !result.internalLinksResolve
    || result.textOverflowOffenders.length
    || result.clippedElements.length
    || (enforceTouchTargets && result.touchTargetOffenders.length)
    || !result.menuWorks
    || !result.keyboardNavigationWorks
    || result.navigationOverflowOffenders.length
    || !result.focusState.focusVisible
    || result.focusState.outlineStyle === 'none'
    || Number.parseFloat(result.focusState.outlineWidth) < 2
    || !result.reducedMotion.matches
    || reducedDurationSeconds > .001
    || !result.reducedMotion.visible
    || result.motionState.heroAnimation === 'none'
    || !result.motionState.heroAnimationState.includes('finished')
    || !result.processMotion.active
    || result.processMotion.progress <= 0
    || !result.contactMotion.visible
    || result.contactMotion.targetTransform === 'none'
    || result.consoleErrors.length
    || result.requestFailures.length
    || result.errorResponses.length;
});

if (failures.length || noJsResults.some((result) => result.httpStatus !== 200 || !result.contentVisible || !result.nativeMenuWorks)) {
  process.exitCode = 1;
}
