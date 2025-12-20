import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // Déclarer les éléments de la page
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
    await this.page.goto('/');
    // Vérifier qu'on est sur la bonne page
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  /**
   *  Login
   * @param username - Nom d'utilisateur
   * @param password - Mot de passe
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Vérifier les messages d'erreur si le login échoue
   * @param expectedText - Texte du message d'erreur attendu
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();

    await expect(this.errorMessage).toContainText(expectedText);
  }
}
