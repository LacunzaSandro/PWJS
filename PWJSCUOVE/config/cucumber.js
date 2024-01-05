module.exports = {
	default: {
		tags: process.env.npm_config_TAGS || "",
		formatOptions: {
			snippetInterface: "async-await"
		},
		paths: [
			"src\\tests\\features\\"
		],
		dryRun: false,
		require: [
			"allure-cucumberjs",
			"src\\tests\\steps\\*.ts",
			"src\\hooks\\hooks.ts"
		],
		requireModule: [
			"ts-node/register"
		],
		format: [
			"progress-bar",
			"./src/helper/report/reporter.js"
		],
		parallel: 2
	}
};