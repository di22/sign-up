import { test, expect, type Page } from '@playwright/test';

test.describe('SignUp page', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle('SignUp');
  });

  test('should has the signUp form', async ({page}) => {
    await page.goto('http://localhost:4200');

    expect(page.locator('form')).toBeDefined();
  });

  test('should not rout with empty form', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('[data-test="form-button"]').click();

    await expect(page).toHaveURL('http://localhost:4200');
    await expect(page.locator('.message-error')).toHaveCount(4);
  });

  test('should view form error messages with invalid data', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('.form__input').first().fill('diaa');
    await page.locator('.form__input').nth(1).fill('hammad');
    await page.locator('.form__input').nth(2).fill('diaa@diaa.com');
    await page.locator('.form__input').nth(3).fill('diaa12345678');

    await page.locator('[data-test="form-button"]').click();

    await expect(page.locator('.message-error')).toHaveCount(1);
    await expect(page).toHaveURL('http://localhost:4200');
  });

  test('should rout success page with valid data', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('.form__input').first().fill('diaa');
    await page.locator('.form__input').nth(1).fill('hammad');
    await page.locator('.form__input').nth(2).fill('diaa@diaa.com');
    await page.locator('.form__input').nth(3).fill('Ali12345678');

    await page.locator('[data-test="form-button"]').click();

    await expect(page).toHaveURL('http://localhost:4200/success');
  });

});
