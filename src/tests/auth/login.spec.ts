import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Users, ErrorMessages } from '../../fixtures/data/users.data';

test.describe('Tests de connexion SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.navigate();
    await page.screenshot({ path: 'screenshots/01-login-page.png', fullPage: true });

  });

  /**
   * TC01: Connexion réussie avec un utilisateur standard
   */
  test('TC01: Connexion réussie avec utilisateur standard', async ({ page }) => {
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await page.screenshot({ path: 'screenshots/02-after-login.png' });
    await expect(page).toHaveURL(/inventory\.html/);

    await expect(page.locator('.title')).toHaveText('Products');

    const products = page.locator('.inventory_item');
    await expect(products.first()).toBeVisible();
    await page.screenshot({ path: 'screenshots/03-dashboard.png', fullPage: true });

  });

  /**
   * TC02: Connexion échouée avec utilisateur bloqué
   */
  test('TC02: Connexion échouée avec utilisateur bloqué', async () => {
    await loginPage.login(Users.LOCKED.username, Users.LOCKED.password);

    // ASSERT

    await loginPage.assertErrorMessage(ErrorMessages.LOCKED_USER);

    console.log(' TC02: Message erreur bloqué - Test PASS');
  });

  /**
   * TC03: Connexion échouée avec champs vides
   */
  test('TC03: Connexion échouée avec champs vides', async () => {
    await loginPage.login(Users.INVALID_USER.username, Users.INVALID_USER.password);
    // ASSERT

    await loginPage.assertErrorMessage(ErrorMessages.USERNAME_REQUIRED);

    console.log(' TC03: Message erreur champs vides - Test PASS');
  });
});
