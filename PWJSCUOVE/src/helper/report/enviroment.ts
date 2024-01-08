const fs = require('fs');
const path = require('path');
const os = require('os');

export function writeAllureEnviromentInfo(outputFolder) {
	const environmentInfo = {
		os_platform: os.platform(),
		os_release: os.release(),
		os_version: os.version(),
		node_version: process.version,
	};


	const content = Object.entries(environmentInfo)
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');


	const filePath = path.join(outputFolder, 'environment.properties');



	if (fs.existsSync(outputFolder)) {
		fs.writeFileSync(filePath, content, 'utf-8');
		console.log(`Archivo ${filePath} creado exitosamente.`);
	} else {
		console.log(`No existe carpeta ${outputFolder}`);
	}

}
