import { test } from '../base/BaseTest';
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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  // TC01 : Vérifier que la page Checkout est affichée
  test('TC01 – Vérifier page Checkout [checkout][smoke]', async () => {
    await checkoutPage.assertPageLoaded('Checkout: Your Information');
  });

  // TC02 : Saisir informations valides et continuer
  test('TC02 – Saisir informations et continuer [checkout]', async () => {
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.verifySummaryIsDisplayed();
  });

  // TC03 : Vérifier message d’erreur pour champs vides
  test('TC03 – Champs vides [checkout]', async () => {
    await checkoutPage.fillInformation('', '', '');
    await checkoutPage.continue();
    await checkoutPage.assertErrorMessage(CheckoutData.ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  // TC04 : Finaliser commande
  test('TC04 – Finaliser commande [checkout]', async () => {
    await checkoutPage.fillInformation(
      CheckoutData.VALID_USER.firstName,
      CheckoutData.VALID_USER.lastName,
      CheckoutData.VALID_USER.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.finish();
    await checkoutPage.verifyOrderConfirmation();
  });
});
