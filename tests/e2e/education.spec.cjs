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
