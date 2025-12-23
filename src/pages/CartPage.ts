import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { 
  expectOnCartPage, 
  expectProductVisible, 
  expectCartItemCount 
} from '../utils/assertions';

/**
 * Page Panier
 */
export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /** Vérifier que l'utilisateur est sur la page panier */
  async assertOnCartPage(): Promise<void> {
    await this.step('Vérifier que l’utilisateur est sur la page panier', async () => {
      await expectOnCartPage(this.page);
    });
  }

  /** Vérifier qu'un produit est visible dans le panier */
  async verifyProductVisible(productName: string): Promise<void> {
    await this.step(`Vérifier que le produit "${productName}" est visible dans le panier`, async () => {
      await expectProductVisible(this.page, productName);
    });
  }

  /** Vérifier le nombre d'articles dans le panier */
  async verifyCartCount(expectedCount: number): Promise<void> {
    await this.step(`Vérifier que le panier contient ${expectedCount} article(s)`, async () => {
      await expectCartItemCount(this.page, expectedCount);
    });
  }

  /** Retirer un produit du panier */
  async removeProduct(productName: string): Promise<void> {
    await this.step(`Retirer le produit "${productName}" du panier`, async () => {
      const product = this.page.locator('.cart_item', { hasText: productName });
      await product.locator('[data-test^="remove"]').click();
    });
  }

  /** Procéder au checkout */
  async proceedToCheckout(): Promise<void> {
    await this.step('Cliquer sur Checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  /** Continuer les achats */
  async continueShopping(): Promise<void> {
    await this.step('Cliquer sur Continue Shopping', async () => {
      await this.continueShoppingButton.click();
    });
  }
}
