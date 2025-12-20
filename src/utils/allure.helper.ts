import { test } from '@playwright/test';

/**
 * Helper pour les steps Allure
 */
export class AllureHelper {
  /**
   * Début d'un step Allure
   */
  static async startStep(name: string): Promise<void> {
    await test.step(name, async () => {
      // Le step sera capturé automatiquement par allure-playwright
    });
  }

  /**
   * Log une information dans le rapport
   */
  static logInfo(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  /**
   * Log une erreur
   */
  static logError(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}