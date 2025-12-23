import { test } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutData } from '../fixtures/data/checkout.data';



test.describe('E2E – SauceDemo Complete Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Aller sur la page
    await page.goto('/');
  });

  test.afterEach(async () => {
    // Logout après chaque test
    await productsPage.logout();
  });

  test('TC01 – Flux complet E2E [e2e][smoke]', async () => {
    // Login
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Vérifier page produits chargée
    await productsPage.isLoaded();

    // Ajouter plusieurs produits
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.addProductToCart(Products.BIKE.name);

    // Vérifier badge du panier
    await productsPage.verifyCartBadge(2);

    // Aller au panier
    await productsPage.goToCart();
    await cartPage.isLoaded();

    // Vérifier produits dans le panier
    await cartPage.verifyProductInCart(Products.BACKPACK.name);
    await cartPage.verifyProductInCart(Products.BIKE.name);

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.isPageLoaded('Checkout: Your Information');

    // Remplir informations et continuer
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();

    // Vérifier récapitulatif
    await checkoutPage.isPageLoaded('Checkout: Overview');
    await checkoutPage.verifySummaryIsDisplayed();

    // Vérifier total
    const total = await checkoutPage.getTotalAmount();
    console.log('Total de la commande:', total);

    // Finaliser commande
    await checkoutPage.finish();
    await checkoutPage.verifyOrderConfirmation();
  });
});
