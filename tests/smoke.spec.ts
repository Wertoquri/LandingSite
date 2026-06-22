import { expect, test } from '@playwright/test';

test('home to case study to contact form', async ({ page }) => {
  await page.goto('/'); await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: /Відкрити кейс|Open case study/ }).first().click(); await expect(page).toHaveURL(/\/work\/taskflow/); await expect(page.getByRole('heading', { name: 'TaskFlow' })).toBeVisible();
  await page.locator('.nav a[href="/contact"]').click(); await expect(page).toHaveURL(/\/contact/); await page.locator('input[name="name"]').fill('Smoke Test'); await page.locator('input[name="email"]').fill('smoke@example.com'); await page.locator('textarea[name="brief"]').fill('A complete browser smoke test inquiry that is not submitted.');
});
