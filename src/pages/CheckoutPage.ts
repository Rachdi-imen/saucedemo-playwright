import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Checkout
 * Gestion de la saisie des informations, validation du récapitulatif et confirmation de commande
 */
export class CheckoutPage extends BasePage {
  private readonly title: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly errorMessage: Locator;
  private readonly summaryInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryInfo = page.locator('.summary_info');
  }

  /** Vérifier que la page Checkout est chargée */
  async isPageLoaded(expectedTitle: string): Promise<void> {
    await this.step(`Vérifier que la page "${expectedTitle}" est chargée`, async () => {
      await expect(this.title).toHaveText(expectedTitle);
    });
  }

  /** Remplir les informations de checkout */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<this> {
    await this.step(`Remplir informations: ${firstName} ${lastName} ${postalCode}`, async () => {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    });
     return this;
  }

  /** Continuer vers l'étape suivante */
  async continue(): Promise<this> {
    await this.step('Cliquer sur Continue', async () => {
      await this.continueButton.click();
    });
    return this;
  }

  /** Finaliser la commande */
  async finish(): Promise<this> {
    await this.step('Cliquer sur Finish', async () => {
      await this.finishButton.click();
    });
    return this;
  }

  /** Vérifier un message d'erreur */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await this.step(`Vérifier message d'erreur: "${expectedText}"`, async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(expectedText);
    });
  }

  /** Vérifier confirmation de commande */
  async verifyOrderConfirmation(): Promise<void> {
    await this.step('Vérifier confirmation de la commande', async () => {
      await this.isPageLoaded('Checkout: Complete!');
      await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
  }

  /** Vérifier le récapitulatif */
  async verifySummaryIsDisplayed(): Promise<void> {
    await this.step('Vérifier récapitulatif de commande', async () => {
      await expect(this.summaryInfo).toBeVisible();
      await expect(this.page.locator('text=Payment Information')).toBeVisible();
      await expect(this.page.locator('text=Shipping Information')).toBeVisible();
    });
  }
async getTotalAmount(): Promise<string> {
      const totalText = await this.page.locator('.summary_total_label').textContent();
      return totalText || '';
    
  }

}


