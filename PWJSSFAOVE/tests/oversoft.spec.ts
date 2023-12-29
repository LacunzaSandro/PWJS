import { test, expect } from '@playwright/test';

const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');



test.afterAll('Creando reporte', async () => {
	const allure = require('allure-commandline');

	// Copiar la carpeta allure-report/history a allure-results/history si existe
	const carpetaOrigen = './allure-report/history';
	const carpetaDestino = './allure-results/history';

	if (fs.existsSync(carpetaOrigen)) {
		// Asegúrate de que la carpeta de destino exista, si no, créala
		await fsExtra.ensureDirSync(carpetaDestino);

		// Copia la carpeta completa
		await fsExtra.copySync(carpetaOrigen, carpetaDestino);
		console.log('Carpeta copiada exitosamente.');
	} else {
		console.log('La carpeta de origen no existe.');
	}
});

test('Oversoft1', async ({ page }) => {
	await page.goto('https://taller-beta.oversoftdms.net/');
	const tbxDomain = page.getByPlaceholder('Subdominio');
	await tbxDomain.fill("dominio");
	const tbxUser = page.getByPlaceholder('Nombre de Usuario');
	await tbxUser.fill("user");
	const tbxPasswod = page.getByPlaceholder('Contraseña');
	await tbxPasswod.fill("password");
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
	await expect(page.locator('body')).toContainText('No se ha encontrado el subdominio');
});

test('Oversoft2', async ({ page }) => {
	await page.goto('https://taller-beta.oversoftdms.net/');
	const tbxDomain = page.getByPlaceholder('Subdominio');
	await tbxDomain.fill("dominio");
	const tbxUser = page.getByPlaceholder('Nombre de Usuario');
	await tbxUser.fill("user");
	const tbxPasswod = page.getByPlaceholder('Contraseña');
	await tbxPasswod.fill("password");
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
	await expect(page.locator('body')).toContainText('No se ha encontrado el subdominio');
});
test('Oversoft3', async ({ page }) => {
	await page.goto('https://taller-beta.oversoftdms.net/');
	const tbxDomain = page.getByPlaceholder('Subdominio');
	await tbxDomain.fill("dominio");
	const tbxUser = page.getByPlaceholder('Nombre de Usuario');
	await tbxUser.fill("user");
	const tbxPasswod = page.getByPlaceholder('Contraseña');
	await tbxPasswod.fill("password");
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
	await expect(page.locator('body')).toContainText('No se ha encontrado el subdominio');
});