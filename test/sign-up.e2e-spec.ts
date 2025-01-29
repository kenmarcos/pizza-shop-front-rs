import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Pizza Shop')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('Jonh Doe')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('11912345678')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  await expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Invalid name')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('Jonh Doe')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('11912345678')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
