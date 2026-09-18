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

test.beforeEach(async ({ page, context }) => {
  await context.route('https://www.youtube.com/embed/**', route => route.fulfill({
    status: 204,
    contentType: 'text/html',
    body: '',
  }));
  await page.addInitScript(() => localStorage.clear());
});

test('switches the overview between complete English and Chinese modes', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  await page.goto('/#overview');
  await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Selected internships' })).toBeVisible();
  await expect(page.locator('#selected-internships article.entry')).toHaveCount(3);
  await expect(page.locator('#selected-internships')).toHaveAttribute('id', 'selected-internships');
  await page.getByRole('button', { name: '中文' }).click();
  await expect(page.getByRole('heading', { name: '关于我' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  assertClean();
});

test('searches the Internship catalogue and opens bilingual detail routes', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  await page.goto('/#internships');
  await expect(page).toHaveTitle('Internship | Hao Chen');
  await expect(page.getByRole('heading', { name: 'Internship experience' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Internship', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('status')).toHaveText('3 of 3 internships');
  await expect(page.locator('.internship-gallery img')).toHaveCount(0);
  await page.getByLabel('Search internships').fill('Cummins');
  await expect(page.getByRole('status')).toHaveText('2 of 3 internships');
  await page.getByLabel('Location').selectOption('remote');
  await expect(page.getByText('No matching internships. Try another keyword or clear the filters.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByLabel('Search internships').fill('Cummins');
  await page.getByRole('heading', { name: 'Cummins Inc. — Turbo Technologies' }).getByRole('link').click();
  await expect(page).toHaveURL(/#internship\/cummins-us$/);
  await expect(page).toHaveTitle('Cummins Inc. — Turbo Technologies | Hao Chen');
  await expect(page.getByRole('link', { name: 'Internship', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Back to all internships' })).toBeVisible();
  await expect(page.locator('.internship-gallery img')).toHaveCount(6);
  await expect(page.locator('.internship-gallery img').first()).toHaveAttribute('loading', 'lazy');
  await page.getByRole('link', { name: 'Back to all internships' }).click();
  await expect(page.getByLabel('Search internships')).toHaveValue('Cummins');
  await expect(page.getByRole('status')).toHaveText('2 of 3 internships');
  await page.getByRole('heading', { name: 'Cummins Inc. — Turbo Technologies' }).getByRole('link').click();
  await page.getByRole('button', { name: '中文' }).click();
  await expect(page).toHaveURL(/#internship\/cummins-us$/);
  await expect(page).toHaveTitle('康明斯公司 — 涡轮增压技术 | Hao Chen');
  await expect(page.getByRole('heading', { name: '康明斯公司 — 涡轮增压技术' })).toBeVisible();
  await expect(page.getByRole('link', { name: '实习经历', exact: true })).toHaveAttribute('aria-current', 'page');
  assertClean();
});

test('loads every Internship detail directly and avoids mobile overflow', async ({ page }) => {
  const assertClean = monitorBrowser(page);
  for (const [id, heading, imageCount] of [
    ['cummins-us', 'Cummins Inc. — Turbo Technologies', 6],
    ['accenture', 'Accenture Co., Ltd.', 0],
    ['cummins-china', 'Cummins (China) Investment Co., Ltd.', 2],
  ]) {
    await page.goto(`/#internship/${id}`);
    await expect(page.locator('h2.detail-heading')).toHaveText(heading);
    await expect(page.locator('.internship-gallery img')).toHaveCount(imageCount);
  }
  await page.goto('/#internship/cummins-us');
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
  await expect(page.locator('.internship-work-item')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Balancing-system validation workflow' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Decision-support web demonstrator' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Read-only production-data and BI pipeline' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From repeated prompt to shared engineering capability' })).toBeVisible();
  await expect(page.locator('.agent-skill-example')).toHaveCount(4);
  await expect(page.locator('.agent-skill-stage')).toHaveCount(4);
  await expect(page.getByRole('heading', { name: 'Make all three coding agents work from the same contract' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evidence-led manufacturing analytics' })).toBeVisible();
  await expect(page.locator('.process-stage')).toHaveCount(5);
  expect(await page.locator('.process-findings li').evaluateAll(items => items.every(item => getComputedStyle(item, '::before').content === 'none'))).toBe(true);
  await expect(page.getByRole('heading', { name: 'From plant question to reviewable evidence' })).toBeVisible();
  await expect(page.locator('.internship-delivery-step')).toHaveCount(5);
  await page.goto('/#internship/cummins-china');
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
  await expect(page.locator('.internship-work-item')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Mining haul-truck fuel comparison' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Heartbeat cumulative-data pipeline' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Two sprints, one delivery practice' })).toBeVisible();
  await expect(page.locator('.process-stage')).toHaveCount(4);
  expect(await page.locator('.process-findings li').evaluateAll(items => items.every(item => getComputedStyle(item, '::before').content === 'none'))).toBe(true);
  await expect(page.getByRole('heading', { name: 'How the Digital Team moved work' })).toBeVisible();
  await expect(page.locator('.internship-delivery-step')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'What I learned' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Public case-study scope' })).toBeVisible();
  await page.goto('/#internship/unknown');
  await expect(page.getByRole('heading', { name: 'Internship not found' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['#internships', '#internship/cummins-us', '#internship/cummins-china']) {
    await page.goto(`/${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
  }
  await page.goto('/#internship/cummins-china');
  const mobileImages = page.locator('.internship-gallery img');
  for (let index = 0; index < await mobileImages.count(); index += 1) {
    const image = mobileImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(node => node.naturalWidth)).toBeGreaterThan(0);
  }
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

test('opens the Midas playable artifact and serves its Unity loader', async ({ page, context }) => {
  const assertPortfolioClean = monitorBrowser(page);
  await page.goto('/#project/midas-curse-unity');
  const popupPromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'Play Game' }).click();
  const playPage = await popupPromise;
  const assertPlayPageClean = monitorBrowser(playPage);

  await expect(playPage).toHaveURL(`${baseOrigin}/play/midas-curse/index.html`);
  await expect(playPage.getByRole('heading', { name: 'Midas Curse' })).toBeVisible();
  await expect(playPage.getByRole('button', { name: /Load game/ })).toBeVisible();

  const loader = await context.request.get('/play/midas-curse/Build/midas-curse.loader.js');
  expect(loader.status()).toBe(200);
  expect((await loader.body()).byteLength).toBeGreaterThan(0);
  assertPortfolioClean();
  assertPlayPageClean();
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

test('keeps the content width stable when Contact does not need scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ['#overview', '#projects', '#contact']) {
    await page.goto(`/${route}`);
    await expect(page.locator('html')).toHaveCSS('scrollbar-gutter', 'stable');
  }
});
