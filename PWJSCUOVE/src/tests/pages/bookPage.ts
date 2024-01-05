import { Page } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

export default class BookPage {

	private page: Page;
	private elements = {
		errorMsg: "#mat-error-0"
	};
	constructor(page: Page) {
		this.page = page;
	}

	async validateErrorMessage(msg: string) {
		await fixture.assert.assertContainsText(this.elements.errorMsg, msg);
	}
}