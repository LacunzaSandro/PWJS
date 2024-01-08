import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const isHeadless = process.env.npm_config_HEADLESS != undefined ? !!process.env.npm_config_HEADLESS : true;

const options: LaunchOptions = {
	headless: isHeadless
};
export const invokeBrowser = () => {
	const browserType = process.env.npm_config_BROWSER || "chrome";
	switch (browserType.toLowerCase()) {
		case "chrome":
			return chromium.launch(options);
		case "firefox":
			return firefox.launch(options);
		case "webkit":
			return webkit.launch(options);
		default:
			console.error(`\x1b[32m No existe un browser: ${browserType}, se utilizara Chrome por defecto.\x1b[0m`);
			return chromium.launch(options);
	}

};