import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Mobile Authentication Tests', () => {
  test.use({ viewport: { width: 375, height: 667 } }); 

  test('Mobile: Successful login on small screen', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await test.step('Navigate to login on mobile', async () => {
      await loginPage.navigate();
    });

    await test.step('Verify mobile layout', async () => {
     await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      
      await page.screenshot({ path: 'screenshots/mobile-login.png' });
    });

    await test.step('Login on mobile', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify mobile dashboard', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_item').first()).toBeVisible();
    });
  });
});