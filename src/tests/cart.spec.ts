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
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();
    await cartPage.isLoaded();
  });

  test.afterEach(async () => {
    await productsPage.logout();
  });

  test('TC01 – Vérifier produit dans le panier [cart]', async () => {
    await cartPage.verifyProductInCart(Products.BACKPACK.name);
  });

  test('TC02 – Retirer produit du panier [cart]', async () => {
    await cartPage.removeProduct(Products.BACKPACK.name);
    await cartPage.verifyCartIsEmpty();
  });
});
