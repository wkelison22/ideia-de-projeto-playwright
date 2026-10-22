import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  get emailInput(): Locator { return this.page.locator('#email'); }
  get passwordInput(): Locator { return this.page.locator('#password'); }
  get loginBtn(): Locator { return this.page.locator('#loginBtn'); }
  get errorMessage(): Locator { return this.page.locator('#errorMessage'); }
  get statusMessage(): Locator { return this.page.locator('#statusMessage'); }

  async goto() {
    await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}