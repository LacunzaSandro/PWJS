import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
	headless: process.env.npm_config_HEADLESS ? JSON.parse(process.env.npm_config_HEADLESS) : false,
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