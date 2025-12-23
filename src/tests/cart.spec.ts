import { test } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';

test.describe('Cart Page – SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await page.goto('/');
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);

    // Ajouter un produit pour tester le panier
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();

    // Vérifier que la page panier est chargée
    await cartPage.assertOnCartPage();
  });

  test.afterEach(async () => {
    await productsPage.logout();
  });

  test('TC01 – Vérifier produit dans le panier [cart][smoke]', async () => {
    await cartPage.verifyProductVisible(Products.BACKPACK.name);
  });

  test('TC02 – Retirer un produit du panier [cart]', async () => {
    await cartPage.removeProduct(Products.BACKPACK.name);
    await cartPage.verifyCartCount(0);
  });

  test('TC03 – Continuer les achats [cart]', async ({ page }) => {
    await cartPage.continueShopping();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC04 – Procéder au checkout [cart]', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await page.waitForLoadState('domcontentloaded');
  });
});
