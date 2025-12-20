import { Page, Locator, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

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
   * Vérifier que la page Checkout est chargée
   */
  async isPageLoaded(expectedTitle: string): Promise<void> {
    await allure.step(`Vérifier que la page "${expectedTitle}" est chargée`, async () => {
      await expect(this.title).toHaveText(expectedTitle);
    });
  }

  /**
   * Remplir les informations de checkout
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<this> {
    await allure.step(`Remplir informations: ${firstName} ${lastName} ${postalCode}`, async () => {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    });
    return this; 
  }

  /**
   * Continuer vers l'étape suivante
   */
  async continue(): Promise<this> {
    await allure.step('Cliquer sur Continue', async () => {
      await this.continueButton.click();
    });
    return this;
  }

  /**
   * Finaliser la commande
   */
  async finish(): Promise<this> {
    await allure.step('Cliquer sur Finish', async () => {
      await this.finishButton.click();
    });
    return this;
  }

  /**
   * Vérifier un message d'erreur
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await allure.step(`Vérifier message d'erreur: "${expectedText}"`, async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(expectedText);
    });
  }

  /**
   * Vérifier confirmation de commande
   */
  async verifyOrderConfirmation(): Promise<void> {
    await allure.step('Vérifier confirmation de la commande', async () => {
      await this.isPageLoaded('Checkout: Complete!');
      await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
  }

  /**
   * Vérifier le récapitulatif
   */
  async verifySummaryIsDisplayed(): Promise<void> {
    await allure.step('Vérifier récapitulatif de commande', async () => {
      await expect(this.summaryInfo).toBeVisible();
      await expect(this.page.locator('text=Payment Information')).toBeVisible();
      await expect(this.page.locator('text=Shipping Information')).toBeVisible();
    });
  }

  /**
   * Récupérer le total de la commande
   */
  async getTotalAmount(): Promise<string> {
    return await allure.step('Récupérer le total de la commande', async () => {
      const totalText = await this.page.locator('.summary_total_label').textContent();
      return totalText || '';
    });
  }
}
