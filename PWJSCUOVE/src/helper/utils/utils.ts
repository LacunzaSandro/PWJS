const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');
import { fixture } from "../../hooks/pageFixture";
import * as messages from '@cucumber/messages';
import { Pickle } from '@cucumber/messages';
import { IWorld } from "@cucumber/cucumber";

export async function globalTeardown() {

	const carpetaOrigen = './allure-report/history';
	const carpetaDestino = './allure-results/history';

	if (fs.existsSync(carpetaOrigen)) {
		await fsExtra.ensureDirSync(carpetaDestino);
		await fsExtra.copySync(carpetaOrigen, carpetaDestino);
	}
};
export async function recordVideo(content: IWorld<any>, status: messages.TestStepResultStatus, result: messages.TestStepResult) {
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
export async function createScreenshot(content: IWorld<any>, status: messages.TestStepResultStatus, pickle: Pickle, result: messages.TestStepResult) {
	let img: Buffer;
	if (result?.status == status) {
		img = await fixture.page.screenshot({ path: `./allure-results/screenshots/${pickle.name}.png`, type: "png" });
		await content.attach(
			img,
			"image/png"
		);

	}
}
export async function deleteVideo(videoPath: string) {
	try {
		await fs.promises.unlink(videoPath);
	} catch (error) {
		console.error(`Error al eliminar el video: ${error.message}`);
	}
}

export async function deleteDirectory(carpetaABorrar: string) {
	fsExtra.remove(carpetaABorrar)
		.then(() => {
		})
		.catch(err => {
			console.error(`Error al borrar la carpeta '${carpetaABorrar}': ${err}`);
		});
}