const { test, expect } = require('@playwright/test');

test('a viewed transcription scene stays complete on return and translation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 740 });
  await page.goto('/#project/meeting-transcribe');
  await page.locator('a[href="play/meeting-transcribe/index.html"]').click();
  const first = page.locator('[data-scene="recording"]');
  const chunks = page.locator('[data-scene="chunks"]');
  await expect(first).toHaveAttribute('data-phase', 'done', { timeout: 10000 });
  await expect(chunks).toHaveAttribute('data-phase', 'pending');
  await chunks.scrollIntoViewIfNeeded();
  await expect(chunks).toHaveAttribute('data-phase', 'done', { timeout: 10000 });
  await expect(chunks).toContainText('14:40');
  await expect(chunks).toContainText('29:40');

  await chunks.evaluate(node => {
    window.chunkPhaseChanges = [];
    new MutationObserver(() => window.chunkPhaseChanges.push(node.dataset.phase))
      .observe(node, { attributes: true, attributeFilter: ['data-phase'] });
  });
  await page.locator('[data-scene="minutes"]').scrollIntoViewIfNeeded();
  await page.locator('#language').click();
  await chunks.scrollIntoViewIfNeeded();
  await expect(chunks).toContainText('重叠');
  await expect(chunks).toHaveAttribute('data-phase', 'done');
  expect(await page.evaluate(() => window.chunkPhaseChanges)).not.toContain('playing');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.locator('#back').click();
  await expect(page).toHaveURL(/#project\/meeting-transcribe$/);
});

test('reduced motion presents the complete example without animated text', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/play/meeting-transcribe/index.html');
  const minutes = page.locator('[data-scene="minutes"]');
  await minutes.scrollIntoViewIfNeeded();
  await expect(minutes).toHaveAttribute('data-phase', 'done');
  await expect(minutes.locator('li')).toHaveCount(4);
  expect(await minutes.evaluate(node => node.getAnimations({subtree: true}).length)).toBe(0);
});
