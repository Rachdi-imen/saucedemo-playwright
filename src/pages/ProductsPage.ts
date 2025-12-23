import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { 
  expectOnInventoryPage, 
  expectTitle, 
} from '../utils/assertions';

/**
 * Page Produits
 */
export class ProductsPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCart: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /** Vérifier que l'utilisateur est sur la page produits */
  async assertOnProductsPage(): Promise<void> {
    await this.step('Vérifier que l’utilisateur est sur la page produits', async () => {
      await expectOnInventoryPage(this.page);
      await expectTitle(this.page, 'Products');
    });
  }

  /** Ajouter un produit au panier par son nom */
  async addProductToCart(productName: string): Promise<void> {
    await this.step(`Ajouter le produit "${productName}" au panier`, async () => {
      const product = this.page.locator('.inventory_item', { hasText: productName });
      await product.locator('[data-test^="add-to-cart"]').click();
    });
  }

  /** Retirer un produit du panier par son nom */
  async removeProductFromCart(productName: string): Promise<void> {
    await this.step(`Retirer le produit "${productName}" du panier`, async () => {
      const product = this.page.locator('.inventory_item', { hasText: productName });
      await product.locator('[data-test^="remove"]').click();
    });
  }

  /** Aller au panier */
  async goToCart(): Promise<void> {
    await this.step('Aller au panier', async () => {
      await this.shoppingCart.click();
    });
  }

  /** Trier les produits */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.step(`Trier les produits par "${option}"`, async () => {
      await this.sortDropdown.selectOption(option);
    });
  }

  /** Déconnexion */
  async logout(): Promise<void> {
    await this.step('Se déconnecter', async () => {
      await this.page.locator('#react-burger-menu-btn').click();
      await this.page.locator('[data-test="logout-sidebar-link"]').click();
    });
  }
}
