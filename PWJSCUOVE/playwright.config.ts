import { defineConfig, devices } from '@playwright/test';
import * as os from "os";

const isHeadless = process.env.npm_config_HEADLESS != undefined ? !!process.env.npm_config_HEADLESS : true;

export default defineConfig({
	testMatch: [
		'*.spec.ts'
	],
	timeout: 60000,
	globalTimeout: 60000,
	testDir: './src/tests/cases',
	retries: 2,
	use: {
		headless: isHeadless,
		locale: 'es-ES',
		screenshot: 'only-on-failure'
	},
	reporter: [
		['html', { outputFolder: './src/logs/reports' }]
	],
	expect: {
		timeout: 50000
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
});
