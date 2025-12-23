import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Panier
 * Gestion du panier, vérification et navigation vers checkout
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

  /** Vérifier que la page panier est chargée */
  async isLoaded(): Promise<void> {
    await this.step('Vérifier que la page panier est chargée', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.title).toHaveText('Your Cart');
      await expect(this.page).toHaveURL(/cart\.html/);
    });
  }

  /** Obtenir le nombre d'articles dans le panier */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /** Vérifier qu'un produit spécifique est dans le panier */
  async verifyProductInCart(productName: string): Promise<void> {
    await this.step(`Vérifier que le produit "${productName}" est dans le panier`, async () => {
      const product = this.page.locator('.cart_item', { hasText: productName });
      await expect(product).toBeVisible();
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

  /** Vérifier que le panier est vide */
  async verifyCartIsEmpty(): Promise<void> {
    await this.step('Vérifier que le panier est vide', async () => {
      await expect(this.cartItems).toHaveCount(0);
    });
  }

  /** Obtenir les noms de tous les produits dans le panier */
  async getAllProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.getItemCount();

    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i)
        .locator('.inventory_item_name')
        .textContent();
      if (name) names.push(name);
    }

    return names;
  }
}
