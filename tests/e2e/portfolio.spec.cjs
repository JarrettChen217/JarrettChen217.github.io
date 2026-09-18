const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const repositoryRoot = path.resolve(__dirname, '../..');
const catalogue = yaml.load(fs.readFileSync(path.join(repositoryRoot, 'projects.yml'), 'utf8'), {
  schema: yaml.JSON_SCHEMA,
});
const publishedProjects = catalogue.projects.filter(project => project.published);
const baseOrigin = 'http://127.0.0.1:4173';

function monitorBrowser(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === baseOrigin && response.status() >= 400) {
      errors.push(`response: ${response.status()} ${response.url()}`);
    }
  });
  return () => expect(errors, errors.join('\n')).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test('switches the overview between complete English and Chinese modes', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  await page.goto('/#overview');
  await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
  await page.getByRole('button', { name: '中文' }).click();
  await expect(page.getByRole('heading', { name: '关于我' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  assertClean();
});

test('searches, combines filters, reports an empty state, and resets', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  await page.goto('/#projects');
  const status = page.getByRole('status');
  await expect(status).toHaveText(`${publishedProjects.length} of ${publishedProjects.length} projects`);
  await page.getByLabel('Search projects').fill('AVL');
  await expect(page.getByRole('link', { name: 'Algorithms in Action — AVL Trees' })).toBeVisible();
  await page.getByLabel('Location').selectOption('au');
  await expect(status).toHaveText(`1 of ${publishedProjects.length} projects`);
  await page.getByLabel('Search projects').fill('definitely-absent-project');
  await expect(page.getByText('No matching projects. Try another keyword or clear the filters.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(status).toHaveText(`${publishedProjects.length} of ${publishedProjects.length} projects`);
  assertClean();
});

test('renders every published project route and keeps AVL media controlled', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  for (const project of publishedProjects) {
    await page.goto(`/#project/${project.id}`);
    await expect(page.locator('h2.detail-heading')).toHaveText(project.name.en);
    await expect(page.getByRole('link', { name: 'Back to all projects' })).toBeVisible();
  }
  await page.goto('/#project/avl-visualisation');
  await expect(page.locator('.project-gallery a').first()).toBeVisible();
  const video = page.locator('video[controls]');
  await expect(video).toBeVisible();
  await expect(video).not.toHaveAttribute('autoplay', /.*/);
  assertClean();
});

test('renders contact and avoids horizontal overflow on mobile routes', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  await page.goto('/#contact');
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['#overview', '#projects', '#project/avl-visualisation']) {
    await page.goto(`/${route}`);
    await expect(page.locator('#main')).toBeVisible();
    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(hasNoOverflow, `${route} must not overflow horizontally`).toBe(true);
  }
  assertClean();
});
