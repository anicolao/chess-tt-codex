import { expect, test } from '@playwright/test';

test('scaffold shell renders with policy content', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Chess TT Codex');
	await expect(page.getByRole('heading', { name: 'Chess TT Codex' })).toBeVisible();
	await expect(page.getByText('Scaffold Only')).toBeVisible();
	await expect(page.locator('main')).toHaveScreenshot('000-scaffold');
});
