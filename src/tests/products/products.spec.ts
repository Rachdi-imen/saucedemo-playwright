import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { Users } from '../../fixtures/data/users.data';
import { Products } from '../../fixtures/data/products.data';
test.describe('Products Page Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await productsPage.isLoaded();
  });

  /**
   * TC-101: Ajouter un produit au panier
   */
  test('TC-101: Add product to cart', async () => {
    await productsPage.addProductToCart(Products.BACKPACK.name);

    await productsPage.verifyCartBadge(1);
  });

  /**
   * TC-102: Ajouter et retirer un produit
   */
  test('TC-102: Add and remove product from cart', async () => {
    await productsPage.addProductToCart(Products.BIKE.name);
    await productsPage.verifyCartBadge(1);

    // Retirer
    await productsPage.removeProductFromCart(Products.BIKE.name);
    await productsPage.verifyCartBadge(0);
  });

  /**
   * TC-103: Trier produits par nom A-Z
   */
  test('TC-103: Sort products by name A-Z', async () => {
    await productsPage.sortProducts('az');
    
    await productsPage.page.waitForTimeout(1000);
    
    await productsPage.verifyProductsSorted('az');
  });
/**
   * TC-104: Trier produits par nom Z-A
   */
  test('TC-104: Sort products by name Z-A', async () => {
    await productsPage.sortProducts('za');
    
    await productsPage.page.waitForTimeout(1000);
    await productsPage.verifyProductsSorted('za');
  });

/**
 * TC-105: Trier produits par prix bas-haut
 */
test('TC-105: Sort products by price low to high', async ({ page }) => {
  await productsPage.sortProducts('lohi');
  
  // ASSERT - Attendre le rechargement
  await page.waitForTimeout(1000);
  
  // Récupérer tous les prix
  const priceElements = page.locator('.inventory_item_price');
  const count = await priceElements.count();
  
  const prices: number[] = [];
  for (let i = 0; i < count; i++) {
    const priceText = await priceElements.nth(i).textContent();
    if (priceText) {
      // Convertir "$29.99" → 29.99
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }
  }
  
  // Vérifier que les prix sont triés croissant
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});
});
