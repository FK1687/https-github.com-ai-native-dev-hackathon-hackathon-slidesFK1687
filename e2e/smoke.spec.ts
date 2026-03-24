import { test, expect } from '@playwright/test';

test('app loads and header is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('text=KLEB.')).toBeVisible();
});
