// Repara que aqui importamos o teste da nossa fixture, e não do Playwright padrão!
import { test, expect } from '../fixtures/auth.fixture';

// Criamos um array com 3 perfis/cenários
const cenarios = [
  { tipo: 'Cliente Válido', email: 'user@system.com', senha: 'UserPassword123', status: 'sucesso' },
  { tipo: 'Admin Válido', email: 'admin@system.com', senha: 'AdminPassword123', status: 'sucesso' },
  { tipo: 'Cliente com senha invalida', email: 'user@system.com', senha: 'erradaaaaaa', status: 'erro' },
  { tipo: 'admin com senha invalida', email: 'admin@system.com', senha: 'erradaaaaaaa', status: 'erro' }
];

test.describe('Data-Driven Testing Dinâmico', () => {
  
  // Usamos a estrutura for...of para gerar os testes sem duplicar código
  for (const cenario of cenarios) {
    
    // Teste demonstrando o uso da fixture "loginPage"
    test(`Login E2E para perfil: ${cenario.tipo}`, async ({ loginPage }) => {
      
      // Como estamos a usar a fixture, não precisamos de chamar o goto() aqui!
      await loginPage.login(cenario.email, cenario.senha);
      
      if (cenario.status === 'erro') {
        // Valida se a mensagem de erro aparece para credenciais inválidas
        await expect(loginPage.errorMessage).toBeVisible();
      } else {
        // Se for sucesso, podes validar outra coisa, como a ausência do erro ou uma mensagem de sucesso
        // Atenção: Esta linha pressupõe que o botão/mensagem de status existe no HTML
        await expect(loginPage.statusMessage).toBeVisible();
      }
    });
  }
});