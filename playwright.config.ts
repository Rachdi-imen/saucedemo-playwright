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
    headless: true,  // Browser visible

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
      use: { ...devices['Desktop Chrome'] },
    },
      {
    name: 'mobile-chrome',
    use: { 
      ...devices['Pixel 5'],
      viewport: { width: 393, height: 851 }
    },
  },
  {
    name: 'mobile-safari',
    use: { 
      ...devices['iPhone 12'],
    },
  },

  ],
});