import { expect, Page } from '@playwright/test';

export async function expectOnInventoryPage(page: Page): Promise<void> {
  await expect(page).toHaveURL(/inventory/);
}


export async function expectTitle(page: Page, expected: string): Promise<void> {
  await expect(page.locator('.title')).toHaveText(expected);
}

export async function expectVisible(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

export async function expectContainsText(page: Page, selector: string, text: string): Promise<void> {
  await expect(page.locator(selector)).toContainText(text);
}

export async function expectCount(page: Page, selector: string, count: number): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(count);
}

/** Vérifier que l'utilisateur est sur la page panier */
export async function expectOnCartPage(page: Page): Promise<void> {
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.title')).toHaveText('Your Cart');
}

/** Vérifier qu'un produit est visible */
export async function expectProductVisible(page: Page, productName: string): Promise<void> {
  const product = page.locator('.cart_item', { hasText: productName });
  await expect(product).toBeVisible();
}

/** Vérifier le nombre d'articles dans le panier */
export async function expectCartItemCount(page: Page, expectedCount: number): Promise<void> {
  const items = page.locator('.cart_item');
  await expect(items).toHaveCount(expectedCount);
}