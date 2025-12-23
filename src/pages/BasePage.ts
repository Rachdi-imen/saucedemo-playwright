import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * BasePage
 * Toutes les pages vont hériter de cette classe
 */
export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  /**
   * Exécuter un step Allure
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected async step(title: string, action: () => Promise<void>) {
    await allure.step(title, action);
  }

  /**
   * Vérifier le titre de la page
   */
  protected async expectTitle(title: string): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText(title);
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
   * Vérifier qu'un élément est visible
   */
  protected async expectVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
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
}
