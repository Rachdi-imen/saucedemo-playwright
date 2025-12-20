import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Page Tests', () => {
  /**
   * TC-201: Ajouter produit et vérifier panier
   */
  test('TC-201: Add product and verify cart', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // ACT 1: Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.isLoaded();
    
    // ACT 2: Ajouter produit
    await productsPage.addProductToCart('Sauce Labs Backpack');
    
    // ACT 3: Aller au panier
    await productsPage.goToCart();
    await cartPage.isLoaded();
    
    // ASSERT
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.verifyProductInCart('Sauce Labs Backpack');
  });

  /**
   * TC-202: Retirer produit du panier
   */
  test('TC-202: Remove product from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // Login et ajouter produit
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.isLoaded();
    
    // Vérifier produit présent
    await cartPage.verifyProductInCart('Sauce Labs Bike Light');
    
    // Retirer produit
    await cartPage.removeProduct('Sauce Labs Bike Light');
    
    // Vérifier panier vide
    await cartPage.verifyCartIsEmpty();
  });

  /**
   * TC-203: Ajouter multiples produits
   */
  test('TC-203: Add multiple products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Ajouter 3 produits
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    
    // Aller au panier
    await productsPage.goToCart();
    await cartPage.isLoaded();
    
    // Vérifier
    await expect(cartPage.cartItems).toHaveCount(3);
    
    const productNames = await cartPage.getAllProductNames();
    expect(productNames).toContain('Sauce Labs Backpack');
    expect(productNames).toContain('Sauce Labs Bike Light');
    expect(productNames).toContain('Sauce Labs Bolt T-Shirt');
  });

  /**
   * TC-204: Continuer les achats
   */
  test('TC-204: Continue shopping from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.isLoaded();
    
    // Continuer les achats
    await cartPage.continueShopping();
    
    // Vérifier retour page produits
    await productsPage.isLoaded();
  });
});