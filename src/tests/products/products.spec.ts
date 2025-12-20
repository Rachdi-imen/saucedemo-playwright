import { test, expect } from '../base/BaseTest';
import { Users } from '../../fixtures/data/users.data';
import { Products } from '../../fixtures/data/products.data';

test.describe('Products Page Tests', () => {

  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.login(Users.STANDARD.username, Users.STANDARD.password);
    await productsPage.isLoaded();
  });

  test('TC-101: Add product to cart', async ({ productsPage }) => {
    await productsPage.addProductToCart(Products.BACKPACK.name);
    await productsPage.verifyCartBadge(1);
  });

  test('TC-102: Add and remove product from cart', async ({ productsPage }) => {
    await productsPage.addProductToCart(Products.BIKE.name);
    await productsPage.verifyCartBadge(1);
    await productsPage.removeProductFromCart(Products.BIKE.name);
    await productsPage.verifyCartBadge(0);
  });

  test('TC-103: Sort products by name A-Z', async ({ productsPage }) => {
    await productsPage.sortProducts('az');
    await productsPage.page.waitForTimeout(1000);
    await productsPage.verifyProductsSorted('az');
  });

  test('TC-104: Sort products by name Z-A', async ({ productsPage }) => {
    await productsPage.sortProducts('za');
    await productsPage.page.waitForTimeout(1000);
    await productsPage.verifyProductsSorted('za');
  });

  test('TC-105: Sort products by price low to high', async ({ productsPage }) => {
    await productsPage.sortProducts('lohi');

    const priceElements = productsPage.page.locator('.inventory_item_price');
    const count = await priceElements.count();

    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      if (priceText) {prices.push(parseFloat(priceText.replace('$', '')))};
    }

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });
});
