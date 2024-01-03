import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout, AfterStep } from "@cucumber/cucumber";
import * as messages from '@cucumber/messages';
import { Page, Browser, chromium, BrowserContext, expect } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { Pickle } from "@cucumber/messages";
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');


let browser: Browser;
let context: BrowserContext;

const TIME = 60000;
//config global timeout
setDefaultTimeout(TIME);

BeforeAll(async function () {

	browser = await invokeBrowser();
});

Before(async function () {
	context = await browser.newContext();
	context.setDefaultTimeout(TIME);

	const page = await context.newPage();
	fixture.page = page;
});
AfterStep(async function ({ pickle, result }) {
	await createScreenshot(this, Status.FAILED, pickle, result);
});
After(async function ({ pickle, result }) {
	await createScreenshot(this, Status.PASSED, pickle, result);
	await fixture.page.close();
	await context.close();
});
AfterAll(async function () {
	await browser.close();
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
async function createScreenshot(context: any, status: messages.TestStepResultStatus, pickle: Pickle, result: messages.TestStepResult) {
	if (result?.status == status) {
		const img = await fixture.page.screenshot({ path: `./allure-results/screenshots/${pickle.name}.png`, type: "png" });
		context.attach(img, "image/png");
	}
}