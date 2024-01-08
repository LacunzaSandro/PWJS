import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout, AfterStep, IWorld } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
import Assert from "./Assert";
import { deleteDirectory, createScreenshot, recordVideo, globalTeardown } from "../helper/utils/utils";
const { writeAllureEnviromentInfo } = require("../helper/report/enviroment");


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
		locale: 'es-ES',
		storageState: 'src/helper/auth/auth.json',
		recordHar: { path: `src/logs/request${pickle.name}.har` },
		recordVideo: {
			dir: "allure-results/videos"
		},
	});
	context.setDefaultTimeout(TIME);
	const page = await context.newPage();
	fixture.page = page;
	fixture.assert = new Assert(page);
	fixture.logger = createLogger(options(scenarioName));
	fixture.page.on('console', (message) => {
		fixture.logger.info(`ERROR Browser: ${message.text()}`);
		console.error(`Error en la consola del navegador: ${message.text()}`);

	});
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
	if (browser) {
		await browser.close();
	}
	if (fixture.logger) {
		await fixture.logger.close();
	}
	await writeAllureEnviromentInfo("allure-results");
	await globalTeardown();
});

