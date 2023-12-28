import { test, expect } from '@playwright/test';

test('Login en Instagram', async ({ page }) => {
	await page.goto('https://www.instagram.com/');
	await page.getByLabel('Teléfono, usuario o correo').fill('mail@correo.com');
	await page.getByLabel('Contraseña').fill('unodos');
	await page.getByRole('button', { name: 'Entrar' }).click();
	await expect(page.locator('#loginForm')).toContainText('Tu contraseña no e correcta. Compruébala.');
});