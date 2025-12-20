import { test } from '../base/BaseTest';
import { Products } from '../../fixtures/data/products.data';
import { Users } from '../../fixtures/data/users.data';

test.describe('Cart Page Tests', () => {

  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await productsPage.isLoaded();
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.goToCart();
    await cartPage.isLoaded();
  });

  test('Vérifier produit dans le panier', async ({ cartPage }) => {
    await cartPage.verifyProductInCart(Products.BACKPACK.name);
  });

  test('Retirer produit du panier', async ({ cartPage }) => {
    await cartPage.removeProduct(Products.BACKPACK.name);
    await cartPage.verifyCartIsEmpty();
  });

  test('Continuer les achats', async ({ cartPage, productsPage }) => {
    await cartPage.continueShopping();
    await productsPage.isLoaded();
  });
});
