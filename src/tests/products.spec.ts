import { test, expect } from '../base/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Users } from '../fixtures/data/users.data';
import { Products } from '../fixtures/data/products.data';

test.describe('Cart Page – SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  // Avant chaque test : login et ajouter produit(s) au panier
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
    await cartPage.isLoaded();
  });

  // Après chaque test : logout
  test.afterEach(async ({ page }) => {
    await productsPage.logout();
  });

  // TC01 : Vérifier qu'un produit est dans le panier
  test('TC01 – Vérifier produit dans le panier [cart][smoke]', async ({ page }) => {
    await cartPage.verifyProductInCart(Products.BACKPACK.name);
  });

  // TC02 : Retirer un produit du panier
  test('TC02 – Retirer un produit du panier [cart]', async ({ page }) => {
    await cartPage.removeProduct(Products.BACKPACK.name);
    await cartPage.verifyCartIsEmpty();
  });

  // TC03 : Continuer les achats depuis le panier
  test('TC03 – Continuer les achats [cart]', async ({ page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  // TC04 : Procéder au checkout
  test('TC04 – Procéder au checkout [cart]', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
