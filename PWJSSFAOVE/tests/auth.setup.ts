import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

const authFile = './helper/.auth/user.json';

setup('authenticate', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.navigate('https://taller-beta.oversoftdms.net');
	await loginPage.login("", "", "");
	await loginPage.validateURL('https://taller-beta.oversoftdms.net/Home/Index');
	await page.context().storageState({ path: authFile });
});