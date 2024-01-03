import { test, expect } from '@playwright/test';
import SintomasPage from '../pages/SintomasPage';

// test('Oversoft Title', async ({ page }) => {
// 	await page.goto('https://taller-beta.oversoftdms.net/Home/Index');
// 	await expect(page.getByRole('heading')).toContainText('Bienvenido:');
// });

test('test', async ({ page }) => {
    const sintomasPage = new SintomasPage(page)
	await page.goto('https://taller-beta.oversoftdms.net/Home/Index');
	await page.getByRole('link', { name: ' Taller ' }).click();
	await page.getByRole('link', { name: 'Anexos ' }).click();
	await page.getByRole('link', { name: 'Síntomas' }).click();
	await page.locator("i.fa.fa-plus").click();
	await page.locator('#main-form #Codigo').fill('NS');
	await page.locator('#main-form #Descripcion').fill('NuevoSintoma');
	await page.getByRole('button', { name: 'Guardar' }).click();
	await expect(page.getByRole('table')).toContainText('NuevoSintoma');
	await expect(page.getByRole('table')).toContainText('NS');
	await page.locator("//td[text()='NuevoSintoma']/..//i[contains(@class,'fa fa-edit')]").click();
	await page.locator('#main-form #Codigo').click();
	await page.locator('#main-form #Codigo').fill('NS2');
	await page.locator('#main-form #Descripcion').click();
	await page.locator('#main-form #Descripcion').fill('NuevoSintoma2');
	await page.getByRole('button', { name: 'Guardar' }).click();
	await expect(page.locator('#toast-container')).toContainText('La operación se completó con éxito.');
	await expect(page.getByRole('table')).toContainText('NS2');
	await expect(page.getByRole('table')).toContainText('NuevoSintoma2');
	await page.locator("//td[text()='NuevoSintoma2']/..//i[contains(@class,'fa fa-trash')]").click();
	await page.locator("//div[@class='modal fade in']//button[@class='btn btn-danger modal-action-button']").click();
	const record = await sintomasPage.validateRecord("Descripción","NuevoSintoma2")
	await expect(record).toBe(false)
  });