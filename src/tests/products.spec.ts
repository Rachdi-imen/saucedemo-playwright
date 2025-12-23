import { test } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';

test.describe('Products Page – SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  // Avant chaque test : login
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await page.goto('/');
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await productsPage.assertOnProductsPage();
  });

  // Après chaque test : logout
  test.afterEach(async () => {
    await productsPage.logout();
  });

  // TC01 : Vérifier que la page produits est affichée
  test('TC01 – Vérifier page produits [products][smoke]', async () => {
    await productsPage.assertOnProductsPage();
  });

  // TC02 : Ajouter un produit au panier
  test('TC02 – Ajouter un produit au panier [products]', async () => {
    await productsPage.addProductToCart(Products.BACKPACK.name);
  });

  // TC03 : Retirer un produit du panier
  test('TC03 – Retirer un produit du panier [products]', async () => {
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.removeProductFromCart(Products.BACKPACK.name);
  });

  // TC04 : Aller au panier
  test('TC04 – Aller au panier [products]', async ({ page }) => {
    await productsPage.goToCart();
    await page.waitForURL(/cart\.html/);
  });
});
