import { test as base,Page } from '@playwright/test';

type Fixtures = { page: Page };

// Fixture globale pour la page
export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await use(page);
  }
});

export { expect } from '@playwright/test';
