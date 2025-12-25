import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  timeout: 60000,

  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['allure-playwright'], 
    ['line']
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

  },

  projects: [
    {
      name: 'chromium',
      outputDir: 'test-results/chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      outputDir: 'test-results/firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      outputDir: 'test-results/webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
