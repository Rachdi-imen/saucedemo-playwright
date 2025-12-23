import { test } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';
import { CheckoutData } from '../fixtures/data/checkout.data';

test.describe('E2E – SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
  });

  test('TC01 – Parcours complet [e2e][smoke]', async () => {
    // Ajouter produit au panier
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();

    // Vérifier produit dans le panier
    await cartPage.verifyProductVisible(Products.BACKPACK.name);

    // Procéder au checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.assertPageLoaded('Checkout: Your Information');

    // Remplir informations et continuer
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();

    // Vérifier récapitulatif
    await checkoutPage.verifySummaryIsDisplayed();

    // Finaliser commande
    await checkoutPage.finish();

    // Vérifier confirmation
    await checkoutPage.verifyOrderConfirmation();
  });

  test.afterEach(async () => {
    await productsPage.logout();
  });
});
