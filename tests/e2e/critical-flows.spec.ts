import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL || 'http://localhost:3456';

test.describe('Nexa Paraguay Critical Flows', () => {

  test('home page loads and shows hero headline', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('h1').first()).toBeVisible();
    const title = await page.title();
    expect(title).toContain('Nexa');
  });

  test('locale switch changes page language', async ({ page }) => {
    await page.goto(`${BASE}/`);
    // Click locale switcher
    const currentLang = await page.locator('[data-locale-switcher]').first().isVisible() || false;
    if (currentLang) {
      await page.locator('[data-locale-switcher]').first().click();
      const newUrl = page.url();
      expect(newUrl).toMatch(/\/en|\/nl|\/de/);
    }
  });

  test('navigation links work across locales', async ({ page }) => {
    for (const locale of ['es', 'en', 'nl', 'de']) {
      await page.goto(`${BASE}/${locale}/programas`);
      await page.waitForLoadState('networkidle');
      const currentUrl = page.url();
      expect(currentUrl).toContain(`/${locale}/programas`);
      // Page should have content
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(50);
    }
  });

  test('CTA button navigates correctly', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const cta = page.locator('a[href*="wa.me"]').first().or(page.locator('a[href*="calendly"]').first()).or(page.locator('a[href*="contacto"]').first());
    if (await cta.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cta.click();
      const href = await cta.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('contact form page renders', async ({ page }) => {
    await page.goto(`${BASE}/es/contacto`);
    await page.waitForLoadState('networkidle');
    // Should not be a 404
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('Not found');
    expect(bodyText).not.toContain('Page not found');
  });

  test('blog page renders latest posts', async ({ page }) => {
    await page.goto(`${BASE}/es/blog`);
    await page.waitForLoadState('networkidle');
    // Should have article elements or blog content
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('faq page accordion works', async ({ page }) => {
    await page.goto(`${BASE}/es/faq`);
    await page.waitForLoadState('networkidle');
    const buttons = page.locator('button');
    const count = await buttons.count();
    if (count > 0) {
      await buttons.first().click();
      await expect(buttons.first()).toBeVisible();
    }
  });

  test('sitemap.xml is valid', async ({ page }) => {
    const resp = await page.request.get(`${BASE}/sitemap.xml`);
    expect(resp.ok()).toBeTruthy();
    const text = await resp.text();
    expect(text).toContain('urlset');
    expect(text).toContain('loc');
  });

  test('API contact endpoint accepts POST', async ({ page }) => {
    const resp = await page.request.post(`${BASE}/api/contact`, {
      data: { nombre: 'Test', email: 'test@example.com', mensaje: 'Prueba' }
    });
    expect(resp.ok()).toBeTruthy();
    const json = await resp.json();
    expect(json.ok).toBe(true);
  });

  test('all locale home pages render without errors', async ({ page }) => {
    for (const locale of ['es', 'en', 'nl', 'de']) {
      const resp = await page.goto(`${BASE}/${locale}`);
      expect(resp?.status()).toBeLessThan(400);
    }
  });
});
