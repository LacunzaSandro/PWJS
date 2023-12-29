import { type FullConfig } from '@playwright/test';
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');

async function globalTeardown(config: FullConfig) {
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
};
export default globalTeardown;