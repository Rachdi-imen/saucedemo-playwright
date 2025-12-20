import { test as base, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

/**
 * Définition des fixtures personnalisées
 */
type BaseFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * Extension du test Playwright
 */
export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

/**
 * Hooks globaux Allure
 */
test.beforeEach(async () => {
  // Labels Allure globaux
  await allure.owner('QA Automation');
  await allure.severity('critical');
  // Le feature peut être surchargé dans les tests
});

test.afterEach(async ({ page }, testInfo) => {
  // 📸 Screenshot automatique en cas d’échec
  if (testInfo.status !== testInfo.expectedStatus) {
    await allure.attachment(
      'Screenshot on failure',
      await page.screenshot({ fullPage: true }),
      'image/png'
    );
  }
});

// Ré-export expect pour garder la même syntaxe
export { expect };
