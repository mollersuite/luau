import { test, expect } from '@playwright/test'

// test('navbar', async ({ page }) => {
//   await page.goto('https://playwright.dev/')
//   const title = page.locator('.navbar__inner .navbar__title')
//   await expect(title).toHaveText('Playwright')
// })

test.describe('navbar', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:3000')
  })

  test('Discord', async ({ page }) => {
    await page.locator('nav [aria-label=Discord]').click()
    expect(page).toHaveURL(/discord\.com/)
    // TODO: make test check if invite is valid
  })

  test('Search', async ({ page }) => {
    await page.locator('input[type="search"]').last().type('moller')
    page.waitForSelector(
      'a[href="/script/419138bc-b215-4fb4-898e-032344ba6e5d"]'
    )
  })
})
