import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * BasePage
 * Toutes les pages vont hériter de cette classe
 * Contient les actions et assertions génériques
 */
export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

 
  protected async step(title: string, action: () => Promise<void>): Promise<void> {
    await allure.step(title, action);
  }

  /**
   * Vérifier le titre de la page (élément .title)
   */
  protected async expectTitle(expected: string): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText(expected);
  }

  /**
   * Vérifier qu'un élément est visible
   */
  protected async expectVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Vérifier qu'un élément contient un texte
   */
  protected async expectText(selector: string, expected: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveText(expected);
  }

  /**
   * Récupérer le texte d'un élément
   */
  protected async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) ?? '';
  }

  /**
   * Cliquer sur un élément
   */
  protected async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Remplir un champ
   */
  protected async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Prendre un screenshot et l'attacher dans Allure
   */
  protected async attachScreenshot(name: string): Promise<void> {
    await allure.attachment(
      name,
      await this.page.screenshot({ fullPage: true }),
      'image/png'
    );
  }

  /**
   * Vérifier qu'un élément contient un texte partiel
   */
  protected async expectContainsText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Vérifier le nombre d'éléments correspond à count
   */
  protected async expectCount(selector: string, count: number): Promise<void> {
    await expect(this.page.locator(selector)).toHaveCount(count);
  }
}
