import { defineConfig, devices } from '@playwright/test';
import * as os from "os";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	globalTeardown: require.resolve('./helper/teardown/global.teardown.ts'),
	timeout: 60000,
	globalTimeout: 60000,
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// reporter: 'html',
	reporter: [
		[
			"allure-playwright",
			{
				detail: true,
				outputFolder: "allure-results",
				suiteTitle: false,
				environmentInfo: {
					os_platform: os.platform(),
					os_release: os.release(),
					os_version: os.version(),
					node_version: process.version,
				},
			},
		],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'https://taller-beta.oversoftdms.net',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		locale: 'es-ES',
		/**Define lenguage */
		screenshot: 'only-on-failure'
		/**add screenshots */
	},
	expect: {
		timeout: 50000
	},
	/* Configure projects for major browsers */
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.ts/ },
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Use prepared auth state.
				storageState: './helper/.auth/user.json',
			},
			dependencies: ['setup'],
		},

		// {
		// 	name: 'firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 		// Use prepared auth state.
		// 		storageState: './helper/.auth/user.json',
		// 	},
		// 	dependencies: ['setup'],
		// },

		// {
		//   name: 'webkit',
		//   use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
