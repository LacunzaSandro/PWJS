import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";
import { fixture } from "./pageFixture";
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');

let browser: Browser;
let page: Page;
//config global timeout
setDefaultTimeout(60000);

Before(async function () {
	browser = await chromium.launch({ headless: false });
	page = await browser.newPage();
	fixture.page = page;
});

After(async function () {
	page.close();
	browser.close();
});
AfterAll(async function () {
	await globalTeardown();
});

async function globalTeardown() {

	const carpetaOrigen = './allure-report/history';
	const carpetaDestino = './allure-results/history';

	if (fs.existsSync(carpetaOrigen)) {
		await fsExtra.ensureDirSync(carpetaDestino);
		await fsExtra.copySync(carpetaOrigen, carpetaDestino);
		console.log('Carpeta copiada exitosamente.');
	} else {
		console.log('La carpeta de origen no existe.');
	}
};