import { Page, expect } from "@playwright/test";
import { fixture } from "./pageFixture";

const TIMEOUT = 20000;

export default class Assert {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async assertContainsText(locator: string, text: string) {
		await expect(this.page.locator(locator)).toContainText(text, { timeout: TIMEOUT });
	}
	async assertTitleContains(text: string) {
		const PAGE_TITLE = await fixture.page.title();
		expect(PAGE_TITLE).toContain(text);
	}
	
}