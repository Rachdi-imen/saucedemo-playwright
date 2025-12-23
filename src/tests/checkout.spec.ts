import { test, expect } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';
import { CheckoutData } from '../fixtures/data/checkout.data';

test.describe('Checkout Page – SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Avant chaque test : login + ajouter produit + aller au panier + checkout step 1
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Ajouter un produit et aller au panier
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();
    await cartPage.isLoaded();

    // Aller à la page de checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.isPageLoaded('Checkout: Your Information');
  });

  // Après chaque test : logout
  test.afterEach(async ({ page }) => {
    await productsPage.logout();
  });

  // TC01 : Remplir correctement les informations
  test('TC01 – Remplir informations checkout [checkout][smoke]', async () => {
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.isPageLoaded('Checkout: Overview');
    await checkoutPage.verifySummaryIsDisplayed();
  });

  // TC02 : Vérifier message d'erreur si champ vide
  test('TC02 – Message d\'erreur champs obligatoires [checkout]', async () => {
    await checkoutPage.fillInformation('', '', '');
    await checkoutPage.continue();

    await checkoutPage.assertErrorMessage(
      CheckoutData.ERROR_MESSAGES.FIRST_NAME_REQUIRED
    );
  });

  // TC03 : Vérifier total et finaliser commande
  test('TC03 – Finaliser commande et vérifier total [checkout]', async () => {
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );

    await checkoutPage.continue();

    const total = await checkoutPage.getTotalAmount();
    console.log('Total de la commande:', total);

    await checkoutPage.finish();
    await checkoutPage.verifyOrderConfirmation();
  });
});
