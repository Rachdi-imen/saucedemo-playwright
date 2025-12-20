import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutData } from '../../fixtures/data/checkout.data';

test.describe('Checkout Page Tests', () => {
  /**
   * TC-301: Checkout complet réussi
   */
  test('TC-301: Complete successful checkout', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ACT 1: Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.isLoaded();

    // ACT 2: Ajouter produit
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.isLoaded();

    // ACT 3: Procéder au checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.isInformationPageLoaded();

    // ACT 4: Remplir informations (avec données fixtures)
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();

    // ASSERT 1: Vérifier page récapitulative
    await checkoutPage.isOverviewPageLoaded();
    await checkoutPage.verifySummaryIsDisplayed();

    // Récupérer le total
    const total = await checkoutPage.getTotalAmount();
    expect(total).toContain('$');

    // ACT 5: Finaliser commande
    await checkoutPage.finish();

    // ASSERT 2: Vérifier confirmation
    await checkoutPage.verifyOrderConfirmation();
  });

  /**
   * TC-302: Checkout avec prénom manquant
   */
  test('TC-302: Checkout with missing first name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.isInformationPageLoaded();

    // Remplir informations incomplètes
    await checkoutPage.fillInformation('', 'Doe', '12345');
    await checkoutPage.continue();

    // Vérifier message d'erreur
    await checkoutPage.assertErrorMessage(
      CheckoutData.ERROR_MESSAGES.FIRST_NAME_REQUIRED
    );
  });

  /**
   * TC-303: Checkout avec code postal manquant
   */
  test('TC-303: Checkout with missing postal code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir sans code postal
    await checkoutPage.fillInformation('John', 'Doe', '');
    await checkoutPage.continue();

    // Vérifier erreur
    await checkoutPage.assertErrorMessage(
      CheckoutData.ERROR_MESSAGES.POSTAL_CODE_REQUIRED
    );
  });

  /**
   * TC-304: Checkout avec plusieurs produits
   */
  test('TC-304: Checkout with multiple products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Ajouter 2 produits
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir informations
    await checkoutPage.fillInformation('Test', 'User', '54321');
    await checkoutPage.continue();

    // Vérifier récapitulatif
    await checkoutPage.isOverviewPageLoaded();
    
    // Vérifier qu'on a 2 articles
    const items = page.locator('.cart_item');
    await expect(items).toHaveCount(2);
  });
});