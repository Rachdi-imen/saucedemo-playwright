import { Page, Locator, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Naviguer vers la page de login
   */
  async navigate(): Promise<void> {
    await allure.step('Naviguer vers la page de login', async () => {
      await this.page.goto('/');
      await expect(this.page).toHaveTitle(/Swag Labs/);
    });
  }

  /**
   * Login avec username et mot de passe
   */
  async login(username: string, password: string): Promise<void> {
    await allure.step(`Saisir le username: ${username}`, async () => {
      await this.usernameInput.fill(username);
    });

    await allure.step(`Saisir le mot de passe`, async () => {
      await this.passwordInput.fill(password);
    });

    await allure.step('Cliquer sur le bouton Login', async () => {
      await this.loginButton.click();
    });

    // Attachment optionnel
    await allure.attachment(
      'Screenshot après tentative de login',
      await this.page.screenshot(),
      'image/png'
    );
  }

  /**
   * Vérifier message d'erreur
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await allure.step(`Vérifier l’affichage du message d’erreur: "${expectedText}"`, async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(expectedText);
    });

    // Attachment texte
    await allure.attachment(
      'Message d’erreur affiché',
      expectedText,
      'text/plain'
    );
  }
}
