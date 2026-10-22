import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Definimos o tipo da nossa fixture
type AuthFixtures = {
  loginPage: LoginPage;
};

// Utilizamos o método base.extend do Playwright para criar a fixture
export const test = base.extend<AuthFixtures>({
  // Esta função vai entregar a instância do Page Object pronta para o teste
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    // O comando goto() já é executado aqui nos bastidores
    await loginPage.goto();
    
    // Entrega a página pronta
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';