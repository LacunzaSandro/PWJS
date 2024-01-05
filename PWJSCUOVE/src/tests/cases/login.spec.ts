import { test as setup, expect } from '@playwright/test';
const authFile = 'src/helper/auth/auth.json';

setup('authenticate', async ({ page }) => {
	await page.goto('https://bookcart.azurewebsites.net/');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByLabel('Username *').click();
	await page.getByLabel('Username *').fill('ortoni11');
	await page.getByLabel('Password *').click();
	await page.getByLabel('Password *').press('CapsLock');
	await page.getByLabel('Password *').fill('P');
	await page.getByLabel('Password *').press('CapsLock');
	await page.getByLabel('Password *').fill('Pas1234');
	await page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
	await expect(page.locator('mat-toolbar-row')).toContainText('account_circle ortoni11 arrow_drop_down');
	await page.context().storageState({ path: authFile });
});