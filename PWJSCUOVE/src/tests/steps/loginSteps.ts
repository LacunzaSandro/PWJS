import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";



Given('User navigates to the application', async function () {
	await fixture.page.goto("https://bookcart.azurewebsites.net");
});



Given('User click on the login link', async function () {
	await fixture.page.locator("//span[text()='Login'][1]").click();
});



Given('User enter the username as {string}', async function (username) {
	await fixture.page.getByLabel('Username *').fill(username);
});



Given('User enter the password as {string}', async function (password) {
	await fixture.page.getByLabel('Password *').fill(password);
});


When('User click on the login button', async function () {
	await fixture.page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
});

Then('Login should be success', async function () {
	const user = await fixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent();
	console.log("Usuario: " + user);


});
When('Login should fail', async function () {
	await expect(fixture.page.locator('#mat-error-0')).toContainText('Username or Password is incorrect.');
});