import { test as base, expect, Page } from '@playwright/test';

type Fixtures = { page: Page };

export const test = base.extend<Fixtures>({
  page: async ({ page }, use): Promise<void> => {
    await use(page);
  }
});

export { expect };
