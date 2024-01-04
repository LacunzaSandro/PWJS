import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout, AfterStep, IWorld } from "@cucumber/cucumber";
import * as messages from '@cucumber/messages';
import { Page, Browser, chromium, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { Pickle } from "@cucumber/messages";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');


let browser: Browser;
let context: BrowserContext;

const TIME = 60000;
//config global timeout
setDefaultTimeout(TIME);

BeforeAll(async function () {
	getEnv();
	browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
	const scenarioName = pickle.name + pickle.id;
	context = await browser.newContext({
		recordVideo: {
			dir: "allure-results/videos"
		},
	});
	context.setDefaultTimeout(TIME);
	const page = await context.newPage();
	fixture.page = page;
	fixture.logger = createLogger(options(scenarioName));
});
AfterStep(async function ({ pickle, result }) {
	await createScreenshot(this, Status.FAILED, pickle, result);
});
After(async function ({ pickle, result }) {
	await createScreenshot(this, Status.PASSED, pickle, result);
	await fixture.page.close();
	await context.close();
	await recordVideo(this, Status.FAILED, result);
});
AfterAll(async function () {
	await browser.close();
	await fixture.logger.close();
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
async function recordVideo(content: IWorld<any>, status: messages.TestStepResultStatus, result: messages.TestStepResult) {
	const videoPath: string = await fixture.page.video().path();
	if (result?.status == status) {
		console.log(videoPath);
		content.attach(
			fs.readFileSync(videoPath),
			'video/webm'
		);
	} else {
		deleteVideo(videoPath);
	}
}
async function createScreenshot(content: IWorld<any>, status: messages.TestStepResultStatus, pickle: Pickle, result: messages.TestStepResult) {

	let img: Buffer;
	if (result?.status == status) {
		img = await fixture.page.screenshot({ path: `./allure-results/screenshots/${pickle.name}.png`, type: "png" });
		await content.attach(
			img,
			"image/png"
		);

	}
}
async function deleteVideo(videoPath: string) {
	try {
		await fs.promises.unlink(videoPath);
	} catch (error) {
		console.error(`Error al eliminar el video: ${error.message}`);
	}
}