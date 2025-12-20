import { test, expect } from '../base/BaseTest';
import { Users } from '../../fixtures/data/users.data';
import { Products } from '../../fixtures/data/products.data';
import { CheckoutData } from '../../fixtures/data/checkout.data';

test.describe('Checkout Page Tests', () => {

  /**
   * TC-301: Checkout complet réussi
   */
  test('TC-301: Complete successful checkout', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

    // ARRANGE: Login
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // ACT 1: Ajouter un produit
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();
    await cartPage.isLoaded();

    // ACT 2: Procéder au checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.isPageLoaded('Checkout: Your Information');

    // ACT 3: Remplir informations
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();

    await checkoutPage.isPageLoaded('Checkout: Overview');
    await checkoutPage.verifySummaryIsDisplayed();

    // ASSERT: Vérifier le total
    const total = await checkoutPage.getTotalAmount();
    expect(total).toContain('$');

    // ACT 5: Finaliser commande
    await checkoutPage.finish();

    // ASSERT: Vérifier confirmation
    await checkoutPage.verifyOrderConfirmation();
  });

  /**
   * TC-302: Checkout avec prénom manquant
   */
  test('TC-302: Checkout with missing first name', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

    // Setup: Login
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Ajouter un produit
    await productsPage.addProductToCart(Products.BIKE.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir informations incomplètes
    await checkoutPage.fillInformation('', CheckoutData.VALID_USER.lastName, CheckoutData.VALID_USER.postalCode);
    await checkoutPage.continue();

    // ASSERT: Vérifier message d'erreur
    await checkoutPage.assertErrorMessage(CheckoutData.ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  /**
   * TC-303: Checkout avec code postal manquant
   */
  test('TC-303: Checkout with missing postal code', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

    // Setup: Login
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Ajouter un produit
    await productsPage.addProductToCart(Products.BIKE.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir sans code postal
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      ''
    );
    await checkoutPage.continue();

    // ASSERT: Vérifier message d'erreur
    await checkoutPage.assertErrorMessage(CheckoutData.ERROR_MESSAGES.POSTAL_CODE_REQUIRED);
  });

  /**
   * TC-304: Checkout avec plusieurs produits
   */
  test('TC-304: Checkout with multiple products', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

    // Setup: Login
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Ajouter plusieurs produits
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.addProductToCart(Products.BIKE.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir informations
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();

    // ASSERT: Vérifier qu'on a 2 articles
    await checkoutPage.isPageLoaded('Checkout: Overview');
    const items = cartPage.cartItems;
    await expect(items).toHaveCount(2);
  });

});
