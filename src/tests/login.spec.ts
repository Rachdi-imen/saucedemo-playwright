import { test, expect } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { Users, ErrorMessages } from '../fixtures/data/users.data';
import { expectOnInventoryPage } from '../utils/assertions';

test.describe('Login – SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test.afterEach(async ({ page }) => {
    await page.screenshot({ path: `screenshots/after-test-${Date.now()}.png` });
  });

  // TC01 : Connexion valide
  test('TC01 – Connexion réussie [smoke][login]', async ({ page }) => {
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await expectOnInventoryPage(page);
  });

  // TC02 : Utilisateur bloqué
  test('TC02 – Utilisateur bloqué [login]', async () => {
    await loginPage.login(Users.LOCKED.username, Users.LOCKED.password);
    await loginPage.assertErrorMessage(ErrorMessages.LOCKED_USER);
  });

  // TC03 : Champs vides
  test('TC03 – Champs vides [login]', async () => {
    await loginPage.login('', '');
    await loginPage.assertErrorMessage(ErrorMessages.USERNAME_REQUIRED);
  });
});
