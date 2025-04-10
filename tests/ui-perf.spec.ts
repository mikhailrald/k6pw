
import { test, expect } from '@playwright/test';

test('basic UI perf test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const perf = await page.evaluate(() => JSON.stringify(window.performance.timing));
  await page.screenshot({ path: 'screenshot.png' });

  console.log('PERF_TIMING:' + perf);
});
