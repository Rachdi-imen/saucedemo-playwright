import { Page, Locator, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCart: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Vérifier que la page produits est chargée
   */
  async isLoaded(): Promise<void> {
    await allure.step('Vérifier que la page produits est chargée', async () => {
      await expect(this.title).toHaveText('Products');
    });
  }

  /**
   * Ajouter un produit au panier par son nom
   * @param productName - Nom du produit
   */
  async addProductToCart(productName: string): Promise<void> {
    await allure.step(`Ajouter le produit "${productName}" au panier`, async () => {
      const product = this.page.locator('.inventory_item', { hasText: productName });
      await product.locator('[data-test^="add-to-cart"]').click();
    });
  }

  /**
   * Retirer un produit du panier par son nom
   * @param productName - Nom du produit
   */
  async removeProductFromCart(productName: string): Promise<void> {
    await allure.step(`Retirer le produit "${productName}" du panier`, async () => {
      const product = this.page.locator('.inventory_item', { hasText: productName });
      await product.locator('[data-test^="remove"]').click();
    });
  }

  /**
   * Aller au panier
   */
  async goToCart(): Promise<void> {
    await allure.step('Aller au panier', async () => {
      await this.shoppingCart.click();
    });
  }

  /**
   * Trier les produits par option
   * @param option - 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await allure.step(`Trier les produits par "${option}"`, async () => {
      await this.sortDropdown.selectOption(option);
    });
  }

  /**
   * Obtenir le nombre de produits affichés
   */
  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Vérifier le badge du panier
   * @param expectedCount - Nombre attendu dans le badge
   */
  async verifyCartBadge(expectedCount: number): Promise<void> {
    await allure.step(`Vérifier le badge du panier: ${expectedCount}`, async () => {
      const cartBadge = this.page.locator('.shopping_cart_badge');
      if (expectedCount > 0) {
        await expect(cartBadge).toHaveText(expectedCount.toString());
      } else {
        await expect(cartBadge).toBeHidden();
      }
    });
  }

  /**
   * Afficher les noms de tous les produits
   */
  async getAllProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.getProductCount();

    for (let i = 0; i < count; i++) {
      const name = await this.inventoryItems.nth(i).locator('.inventory_item_name').textContent();
      if (name) {names.push(name)};
    }

    return names;
  }

  /**
   * Vérifier l'ordre des produits
   */
  async verifyProductsSorted(sortType: 'az' | 'za'): Promise<void> {
    await allure.step(`Vérifier l'ordre des produits (${sortType === 'az' ? 'A-Z' : 'Z-A'})`, async () => {
      const productNames = await this.getAllProductNames();

      const expectedSorted = [...productNames].sort((a, b) => {
        const comparison = a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
        return sortType === 'az' ? comparison : -comparison;
      });

      expect(productNames, `Les produits doivent être triés ${sortType === 'az' ? 'A-Z' : 'Z-A'}`)
        .toEqual(expectedSorted);
    });
  }

  /** 
   * Logout
   */
  async logout(): Promise<void> {
    await allure.step('Se déconnecter', async () => {
      await this.page.locator('#react-burger-menu-btn').click();
      await this.page.locator('[data-test="logout-sidebar-link"]').click();
    });
  }
}
