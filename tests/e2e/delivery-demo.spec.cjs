const { test, expect } = require('@playwright/test');

const demoUrl = '/play/autonomous-delivery/index.html';

test('delivery demo supports keyboard selection, local tracking and locale changes', async ({ page, baseURL }) => {
  const externalRequests = [];
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL).origin) return route.continue();
    externalRequests.push(url.href);
    return route.abort();
  });
  await page.goto('/#project/autonomous-delivery');
  await page.getByRole('link', { name: 'Try the delivery demo' }).click();
  await expect(page).toHaveURL(new URL(demoUrl, baseURL).href);

  const address = page.getByRole('combobox');
  await expect(address).toHaveAccessibleName('Sample delivery address');
  const start = page.getByRole('button', { name: 'Start sample tracking', exact: true });
  await expect(start).toBeDisabled();
  await address.fill('Oakland');
  await expect(page.getByText('No matching sample addresses.')).toBeVisible();
  await expect(address).toHaveAttribute('aria-expanded', 'false');

  await address.fill('Ferry');
  await address.press('ArrowDown');
  await expect(address).toHaveAttribute('aria-activedescendant', 'sample-ferry');
  await address.press('Escape');
  await expect(address).toHaveAttribute('aria-expanded', 'false');
  await address.press('ArrowDown');
  await address.press('Enter');
  await expect(address).toHaveValue('Ferry Building');
  await start.click();
  await expect(page.getByRole('heading', { name: 'Sample tracking map' })).toBeFocused();
  await expect(page.getByText('Ready for pickup', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Advance sample status' }).click();
  await expect(page.getByText('In transit', { exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: /Ferry Building Sample vehicle/ })).toBeVisible();

  await page.getByRole('button', { name: '中文' }).click();
  await expect(address).toHaveValue('渡轮大厦');
  await expect(page.getByText('配送中', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '推进模拟配送状态', exact: true }).click();
  await expect(page.getByText('已送达', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '重新开始模拟追踪', exact: true }).click();
  await expect(page.getByText('等待取件', { exact: true })).toBeVisible();
  await address.fill('Larkin');
  await expect(page.getByRole('button', { name: '开始模拟追踪', exact: true })).toBeDisabled();
  await expect(page.getByText('等待取件', { exact: true })).toBeHidden();

  await page.getByRole('link', { name: '返回项目详情' }).click();
  await expect(page).toHaveURL(/#project\/autonomous-delivery$/);
  await expect(page.getByRole('heading', { name: '自主配送应用', exact: true })).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test.describe('touch and browser locale', () => {
  test.use({ locale: 'zh-CN', viewport: { width: 360, height: 800 }, colorScheme: 'dark', hasTouch: true });

  test('uses the browser language and allows tapping a sample at mobile width', async ({ page }) => {
    await page.goto(demoUrl);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
    const address = page.getByRole('combobox', { name: '示例配送地址' });
    await address.tap();
    await page.getByRole('option', { name: /旧金山市政厅/ }).tap();
    await expect(address).toHaveValue('旧金山市政厅');
    await page.getByRole('button', { name: '开始模拟追踪', exact: true }).tap();
    await expect(page.getByRole('img', { name: '旧金山配送范围示意图。' })).toBeVisible();
    expect(await page.locator('body').evaluate(body => body.scrollWidth)).toBeLessThanOrEqual(360);
  });
});
