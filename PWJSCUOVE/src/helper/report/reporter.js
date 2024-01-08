const { CucumberJSAllureFormatter, AllureRuntime } = require("allure-cucumberjs");
const path = require("path");

class Reporter extends CucumberJSAllureFormatter {
	constructor(options) {
		super(
			options,
			new AllureRuntime({
				resultsDir: path.resolve(process.cwd(), "allure-results")
			}),
			{
				labels: [
					{
						pattern: [/@feature:(.*)/],
						name: "epic",
					},
					{
						pattern: [/@severity:(.*)/],
						name: "severity",
					},
				],
				links: [
					{
						pattern: [/@issue=(.*)/],
						type: "issue",
						urlTemplate: "https://example.com/issue/%s",
					},
					{
						pattern: [/@tms=(.*)/],
						type: "tms",
						urlTemplate: "https://example.com/tms/%s",
					},
				],
			},
		);
	}

}


module.exports = Reporter;