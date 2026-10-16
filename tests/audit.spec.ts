import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

async function skipSeen(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem('em-intro-seen', 'true'));
}
async function revealAll(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await page.waitForTimeout(100);
  }
  await page.locator('#home').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
}

test('intro completes despite background scroll; focus and session handoff', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.intro-skip-btn')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.intro-skip-btn')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.intro-skip-btn')).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  // Trigger the scroll state updates that previously restarted phase timers.
  for (let i = 0; i < 6; i++) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), i * 180);
    await page.waitForTimeout(200);
  }
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0, { timeout: 2200 });
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert');
  expect(await page.evaluate(() => sessionStorage.getItem('em-intro-seen'))).toBe('true');
  await page.reload();
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0);
  await page.goto('/?replay=true');
  await expect(page.locator('.intro-skip-btn')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0);
  await page.goto('/?intro=true');
  await page.locator('.intro-skip-btn').click();
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0);
});

test('reduced motion bypasses intro even for replay', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?replay=true');
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0);
  await expect(page.locator('main')).not.toHaveAttribute('inert');
  await expect(page.locator('h1')).toBeVisible();
});

test('deferred assets, project dialogs, deep links and focus restoration', async ({ page }) => {
  await skipSeen(page);
  const requests: string[] = [];
  page.on('request', r => requests.push(r.url()));
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.waitForTimeout(500);
  expect(requests.filter(url => /assets\/Project(?:Visual|Dialog)-/.test(url))).toEqual([]);
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('.project-visual-wrap .pv-root')).toHaveCount(3);
  const buttons = page.locator('.case-study-link');
  for (let i = 0; i < 3; i++) {
    await buttons.nth(i).click();
    await expect(page.locator('dialog')).toBeVisible();
    await expect(page.locator('dialog .pv-root')).toBeVisible();
    await expect(page.locator('dialog .icon-button')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(buttons.nth(i)).toBeFocused();
  }
  await page.goto('/#project/guardian');
  await expect(page.locator('dialog')).toBeVisible();
  await expect(page.locator('.architecture')).toBeVisible();
  await page.locator('dialog .icon-button').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('dialog')).toHaveCount(0);
});

test('language, theme, navigation, validation and CV download', async ({ page }, info) => {
  await skipSeen(page);
  await page.goto('/');
  await page.getByRole('button', {name: 'Français', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toContainText('Développeur');
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  if (info.project.name === 'mobile') {
    await page.locator('.mobile-menu').click();
    await expect(page.locator('.mobile-menu')).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('.mobile-menu')).toBeFocused();
    await page.locator('.mobile-menu').click();
  }
  await page.locator('#main-navigation a[href="#skills"]').click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#main-navigation a[href="#skills"]')).toHaveAttribute('aria-current', 'location');
  await page.locator('.contact-submit').click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
  await expect(page.locator('#name')).toBeFocused();
  await page.locator('#name').fill('Test Visitor');
  await page.locator('#email').fill('invalid');
  await page.locator('#subject').fill('Portfolio');
  await page.locator('#message').fill('Validation test only.');
  await page.locator('.contact-submit').click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(1);
  await expect(page.locator('#email')).toBeFocused();
  const cv = page.locator('a[download]');
  const response = await page.request.get((await cv.getAttribute('href'))!);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const downloadPromise = page.waitForEvent('download');
  await cv.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('el-mostafa-belayd-cv.pdf');
  expect(await download.failure()).toBeNull();
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

for (const theme of ['dark', 'light']) {
  test(`${theme} theme accessibility in both languages`, async ({ page }, info) => {
    await skipSeen(page);
    await page.addInitScript(theme => localStorage.setItem('em-theme', theme), theme);
    await page.goto('/');
    for (const language of ['en', 'fr']) {
      if (language === 'fr') await page.getByRole('button', { name: 'Français', exact: true }).click();
      await revealAll(page);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      await info.attach(`axe-${language}-${theme}`, { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' });
      expect(result.violations).toEqual([]);
      await page.screenshot({ path: info.outputPath(`${language}-${theme}.png`), fullPage: true });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('security headers support real app interactions without CSP violations', async ({ page }) => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const headers = Object.fromEntries(config.headers[0].headers.map((h: {key: string; value: string}) => [h.key.toLowerCase(), h.value]));
  const html = readFileSync('dist/index.html', 'utf8');
  for (const script of html.matchAll(/<script(?: type="application\/ld\+json")?>([\s\S]*?)<\/script>/g)) {
    const hash = createHash('sha256').update(script[1]).digest('base64');
    expect(headers['content-security-policy-report-only']).toContain(`'sha256-${hash}'`);
  }
  await page.route('**/*', async route => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), ...headers } });
  });
  await page.addInitScript(() => {
    (window as any).policyViolations = [];
    document.addEventListener('securitypolicyviolation', e => (window as any).policyViolations.push({ directive: e.violatedDirective, blocked: e.blockedURI }));
  });
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  const client = await page.context().newCDPSession(page);
  await client.send('Audits.enable');
  const issues: string[] = [];
  client.on('Audits.issueAdded', e => issues.push(e.issue.code));
  await page.goto('/');
  await page.locator('.intro-skip-btn').click();
  await expect(page.locator('.portfolio-intro-root')).toHaveCount(0);
  await page.locator('.theme-toggle').click();
  await page.getByRole('button', {name: 'Français', exact: true}).click();
  await page.locator('.case-study-link').first().click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.contact-submit').click();
  expect(await page.evaluate(() => (window as any).policyViolations)).toEqual([]);
  expect(errors).toEqual([]);
  expect(issues).toEqual([]);
});

test('responsive layouts at narrow and intermediate widths', async ({ page }) => {
  await skipSeen(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.getByRole('button', {name: 'Français', exact: true}).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('h1')).toBeVisible();
  }
});
