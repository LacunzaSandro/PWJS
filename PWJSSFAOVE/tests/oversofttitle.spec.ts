import { test, expect } from '@playwright/test';

test('Oversoft Title', async ({ page }) => {
	await page.goto('https://taller-beta.oversoftdms.net/Home/Index');
	await expect(page.getByRole('heading')).toContainText('Bienvenido:');
});