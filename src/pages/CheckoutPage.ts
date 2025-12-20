import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly summaryInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryInfo = page.locator('.summary_info');
  }

  /**
   * Vérifier que la page checkout information est chargée
   */
  async isInformationPageLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  /**
   * Vérifier que la page checkout overview est chargée
   */
  async isOverviewPageLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  /**
   * Vérifier que la page checkout complete est chargée
   */
  async isCompletePageLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  /**
   * Remplir les informations de checkout
   */
  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continuer vers l'étape suivante
   */
  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Finaliser la commande
   */
  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Vérifier un message d'erreur
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /**
   * Vérifier que la commande est confirmée
   */
  async verifyOrderConfirmation(): Promise<void> {
    await this.isCompletePageLoaded();
    await expect(this.page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  }

  /**
   * Vérifier le récapitulatif
   */
  async verifySummaryIsDisplayed(): Promise<void> {
    await expect(this.summaryInfo).toBeVisible();
    await expect(this.page.locator('text=Payment Information')).toBeVisible();
    await expect(this.page.locator('text=Shipping Information')).toBeVisible();
  }

  /**
   * Obtenir le total de la commande
   */
  async getTotalAmount(): Promise<string> {
    const totalElement = this.page.locator('.summary_total_label');
    const totalText = await totalElement.textContent();
    return totalText || '';
  }
}