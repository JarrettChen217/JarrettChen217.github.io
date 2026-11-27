const { test, expect } = require('@playwright/test');

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`Melbourne education route at ${width}px with ${colorScheme} preference`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme });
      await page.goto('/#overview/education');
      await page.locator('#education a[href="#education/unimelb"]').click();
      const main = page.locator('main');
      const courses = await page.evaluate(() => CONTENT.education.unimelb.courseGroups.flatMap(group => group.courses.map(course => course.name)));
      expect(new Set(courses).size).toBe(24);
      for (const language of ['en', 'zh']) {
        await page.locator(`button[data-lang="${language}"]`).click();
        await expect(main).toContainText('3.63/4.0 (WES)');
        await expect(main).toContainText(language === 'en' ? 'subtree heights' : '子树高度');
        await expect(main.locator('a[href="#project/midas-curse-unity"]')).toBeVisible();
        await expect(main.locator('a[href="#project/avl-visualisation"]')).toBeVisible();
        const photos = main.locator('.school-photo img');
        await expect(photos).toHaveCount(2);
        for (const photo of await photos.all()) {
          await photo.scrollIntoViewIfNeeded();
          await expect.poll(() => photo.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
        }
        const text = await main.innerText();
        for (const course of courses) expect(text).toContain(course);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      }
      await page.reload();
      await expect(main).toContainText('子树高度');
      await main.locator('a[href="#overview/education"]').click();
      await expect(page).toHaveURL(/#overview\/education$/);
    });
  }
}

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`Columbia education route at ${width}px with ${colorScheme} preference`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme });
      await page.goto('/#overview/education');
      await expect(page.locator('#education')).toContainText('Sep 2025');
      await page.locator('#education a[href="#education/columbia"]').click();
      const main = page.locator('main');
      for (const language of ['en', 'zh']) {
        await page.locator(`button[data-lang="${language}"]`).click();
        await expect(main).toContainText('3.75/4.0');
        await expect(main).not.toContainText('WES');
        await expect(main).toContainText('GPIO 32');
        await expect(main.locator('.school-figures figure')).toHaveCount(2);
        const photos = main.locator('.school-photo img');
        await expect(photos).toHaveCount(6);
        for (const photo of await photos.all()) {
          await photo.scrollIntoViewIfNeeded();
          await expect.poll(() => photo.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
        }
        await expect(main.locator('.school-story figcaption').last()).toContainText(language === 'en' ? 'New York' : '纽约');
        await expect(main.locator('.school-course-group li')).toHaveCount(10);
        await expect(main.locator('.school-semester').filter({hasText: language === 'en' ? 'In progress' : '在读'})).toHaveCount(2);
        await expect(main.getByText('Artificial Intelligence', {exact: true})).toHaveCount(0);
        for (const project of ['vitalguard', 'java-concurrency', 'dance-xr']) {
          await expect(main.locator(`a[href="#project/${project}"]`)).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      }
      await page.reload();
      await expect(main).toContainText('2025年9月');
      await main.locator('a[href="#overview/education"]').click();
      await expect(page).toHaveURL(/#overview\/education$/);
    });
  }
}
