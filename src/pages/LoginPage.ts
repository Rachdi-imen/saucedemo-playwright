import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Login
 * Gestion de la connexion
 */
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Effectue la connexion
   * @param username Nom d'utilisateur
   * @param password Mot de passe
   */
  async login(username: string, password: string): Promise<void> {
    await this.step(`Saisir username: ${username} et mot de passe`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
    // Screenshot après tentative de login
    await this.attachScreenshot('Après login');
  }

  /**
   * Vérifie le message d'erreur affiché
   * @param expected Texte attendu
   */
  async assertErrorMessage(expected: string): Promise<void> {
    await this.step(`Vérifier message d'erreur: "${expected}"`, async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(expected);
    });
  }
}
