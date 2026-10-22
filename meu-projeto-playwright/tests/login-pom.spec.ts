import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Testes E2E Limpos com POM', () => {
  let loginPage: LoginPage;

  // Instanciar a classe LoginPage no beforeEach
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Cenário 1 (Caminho Feliz): Login de cliente válido
  test('Deve logar com sucesso e validar o redirecionamento', async ({ page }) => {
    await loginPage.login('user@system.com', 'UserPassword123');
    
    // O professor pede a validação de redirecionamento. 
    // NOTA: Se a página real para onde o site vai for diferente de "painel", deves alterar a palavra "painel" abaixo.
    await expect(page).toHaveURL(/.*painel/); 
  });

  // Cenário 2 (Caminho Triste): Senha incorreta
  test('Deve exibir erro com senha incorreta', async () => {
    await loginPage.login('user@system.com', 'senhaerrada');
    
    // Valida se a mensagem de erro aparece no ecrã sem usar seletores CSS
    await expect(loginPage.errorMessage).toBeVisible();
  });

  // Cenário 3 (Regra de Negócio): Botão desabilitado
  test('O botão deve iniciar desabilitado', async () => {
    // Valida a propriedade de estar desabilitado
    await expect(loginPage.loginBtn).toBeDisabled();
  });
});