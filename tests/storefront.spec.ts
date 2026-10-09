import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('the collection can be filtered, searched, sorted, and reset', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Good tech.')
  await expect(page.locator('.product-card')).toHaveCount(6)
  await page.getByRole('button', { name: 'Laptops', exact: true }).click()
  await expect(page.locator('.product-card')).toHaveCount(2)
  await page.getByRole('button', { name: 'All essentials' }).click()
  await page.getByRole('combobox', { name: 'Sort products' }).selectOption('price-low')
  await expect(page.locator('.product-card').first()).toContainText('Go Mouse')
  await page.getByRole('searchbox', { name: 'Search products' }).fill('nothing-matches-this')
  await expect(page.getByRole('heading', { name: 'No essentials found.' })).toBeVisible()
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await expect(page.locator('.product-card')).toHaveCount(6)
  await expect(page.locator('.product-card').first()).toContainText('Everyday 14')
})

test('product details support Escape and prefill an enquiry', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'View details for Everyday 14' })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toContainText('5,490 MAD')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.getByRole('button', { name: 'Enquire about Everyday 14' }).click()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByLabel('I’m interested in')).toHaveValue('Everyday 14')
  await expect(page.getByLabel('Your name')).toBeFocused()
})

test('the enquiry validates inputs and prepares an honest demo message', async ({
  page,
  context,
}) => {
  const popups: string[] = []
  page.on('popup', (popup) => popups.push(popup.url()))
  await page.goto('/')
  await page.getByRole('button', { name: 'Let’s chat on WhatsApp' }).click()
  await expect(page.getByText('Please enter your name (at least 2 characters).')).toBeVisible()
  await expect(page.getByLabel('Your name')).toBeFocused()
  await page.getByLabel('Your name').fill('Amine')
  await page.getByLabel('I’m interested in').selectOption('General advice')
  await page
    .getByLabel('A little about what you need')
    .fill('A laptop for studying, around 6,000 MAD.')
  await page.getByRole('button', { name: 'Let’s chat on WhatsApp' }).click()
  await expect(page.getByText('Demo message prepared. Nothing has been sent.')).toBeVisible()
  await expect(page.getByLabel('Prepared WhatsApp message')).toContainText('6,000 MAD')
  await expect(page.getByLabel('Prepared WhatsApp message')).toContainText('My name is Amine.')
  expect(popups).toHaveLength(0)
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: 'Copy message' }).click()
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('6,000 MAD')
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error('Clipboard unavailable')
    }
  })
  await page.getByRole('button', { name: 'Copied', exact: true }).click()
  await expect(
    page.getByText('Copy isn’t available here. Select and copy the message above.'),
  ).toBeVisible()
  await page
    .getByLabel('A little about what you need')
    .fill('Changed my request: I need a desktop instead.')
  await expect(page.getByLabel('Prepared WhatsApp message')).toHaveCount(0)
})

test('navigation, FAQs, and the layout work at the selected screen size', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'The collection' })
      .click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  } else {
    await expect(page.getByRole('button', { name: 'Open menu' })).not.toBeVisible()
  }
  await page.getByText('Are these real products and prices?', { exact: true }).click()
  await expect(
    page.getByText('This is a fictional shop demo.', { exact: false }).first(),
  ).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  expect(errors).toEqual([])
  if (testInfo.project.name === 'mobile') {
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({ width, height: 844 })
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
    }
  }
})

test('the page and product dialog have no detected WCAG AA violations', async ({ page }) => {
  await page.goto('/')
  const pageResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(pageResults.violations).toEqual([])
  await page.getByRole('button', { name: 'View details for Everyday 14' }).click()
  const dialogResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(dialogResults.violations).toEqual([])
})
