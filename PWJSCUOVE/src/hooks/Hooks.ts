import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout, AfterStep, IWorld } from "@cucumber/cucumber";
import * as messages from '@cucumber/messages';
import { Page, Browser, chromium, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { Pickle } from "@cucumber/messages";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
import Assert from "./Assert";
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');

const runCucumber = require('../helper/utils/runner');


let browser: Browser;
let context: BrowserContext;

const TIME = 60000;
//config global timeout
setDefaultTimeout(TIME);

BeforeAll(async function () {
	getEnv();
	await deleteDirectory("src/logs");
	browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
	const scenarioName = pickle.name + pickle.id;
	context = await browser.newContext({
		storageState: 'src/helper/auth/auth.json',
		recordVideo: {
			dir: "allure-results/videos"
		},
	});
	context.setDefaultTimeout(TIME);
	const page = await context.newPage();
	fixture.page = page;
	fixture.assert = new Assert(page);
	fixture.logger = createLogger(options(scenarioName));
});
// Before("not @auth", async function ({ pickle }) {
// 	const scenarioName = pickle.name + pickle.id;
// 	context = await browser.newContext({
// 		recordVideo: {
// 			dir: "allure-results/videos"
// 		},
// 	});
// 	context.setDefaultTimeout(TIME);
// 	const page = await context.newPage();
// 	fixture.page = page;
// 	fixture.assert = new Assert(page);
// 	fixture.logger = createLogger(options(scenarioName));
// });
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
	if (browser) {
		await browser.close();
	}
	if (fixture.logger) {
		await fixture.logger.close();
	}

	await globalTeardown();
});

async function globalTeardown() {

	const carpetaOrigen = './allure-report/history';
	const carpetaDestino = './allure-results/history';

	if (fs.existsSync(carpetaOrigen)) {
		await fsExtra.ensureDirSync(carpetaDestino);
		await fsExtra.copySync(carpetaOrigen, carpetaDestino);
	}
};
async function recordVideo(content: IWorld<any>, status: messages.TestStepResultStatus, result: messages.TestStepResult) {
	const videoPath: string = await fixture.page.video().path();
	if (result?.status == status) {
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
async function deleteDirectory(carpetaABorrar: string) {
	fsExtra.remove(carpetaABorrar)
		.then(() => {
		})
		.catch(err => {
			console.error(`Error al borrar la carpeta '${carpetaABorrar}': ${err}`);
		});
}