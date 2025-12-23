import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { 
  expectTitle, 
  expectVisible, 
  expectContainsText 
} from '../utils/assertions';

/**
 * Page Checkout
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
  async assertPageLoaded(expectedTitle: string): Promise<void> {
    await this.step(`Vérifier que la page "${expectedTitle}" est chargée`, async () => {
      await expectTitle(this.page, expectedTitle);
    });
  }

  /** Remplir les informations de checkout */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.step(`Remplir les informations: ${firstName} ${lastName} ${postalCode}`, async () => {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    });
  }

  /** Continuer vers l'étape suivante */
  async continue(): Promise<void> {
    await this.step('Cliquer sur Continue', async () => {
      await this.continueButton.click();
    });
  }

  /** Finaliser la commande */
  async finish(): Promise<void> {
    await this.step('Cliquer sur Finish', async () => {
      await this.finishButton.click();
    });
  }

  /** Vérifier un message d'erreur */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await this.step(`Vérifier message d'erreur: "${expectedText}"`, async () => {
      await expectVisible(this.page, '[data-test="error"]');
      await expectContainsText(this.page, '[data-test="error"]', expectedText);
    });
  }

  /** Vérifier confirmation de commande */
  async verifyOrderConfirmation(): Promise<void> {
    await this.step('Vérifier confirmation de la commande', async () => {
      await this.assertPageLoaded('Checkout: Complete!');
      await expectContainsText(this.page, '.complete-header', 'Thank you for your order!');
    });
  }

  /** Vérifier le récapitulatif */
  async verifySummaryIsDisplayed(): Promise<void> {
    await this.step('Vérifier récapitulatif de commande', async () => {
      await expectVisible(this.page, '.summary_info');
      await expectVisible(this.page, 'text=Payment Information');
      await expectVisible(this.page, 'text=Shipping Information');
    });
  }
}
