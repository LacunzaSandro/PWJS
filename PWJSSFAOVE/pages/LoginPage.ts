import { Page } from "@playwright/test";

export default class LoginPage {
	page: Page;
	subdominio: string;
	userName: string;
	password: string;
	btnName: string;

	constructor(page: Page) {
		this.page = page;
		this.subdominio = "Subdominio";
		this.userName = "Nombre de Usuario";
		this.password = "Contraseña";
		this.btnName = 'Iniciar sesión';
	}

	async navigate(url: string) {
		await this.page.goto(url);
	}

	async login(dominio: string, user: string, password: string) {
		await this.page.getByPlaceholder(this.subdominio).fill(dominio);
		await this.page.getByPlaceholder(this.userName).fill(user);
		await this.page.getByPlaceholder(this.password).fill(password);
		await this.page.getByRole('button', { name: this.btnName }).click();
	}

	async validateURL(url: string) {
		await this.page.waitForURL(url);
	}


}