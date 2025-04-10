import { test, expect } from '@playwright/test';
import fs from 'fs';

test('basic UI perf test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const perf = await page.evaluate(() => JSON.stringify(window.performance.timing));

  // Записываем лог в файл
  fs.writeFileSync('playwright.log', `PERF_TIMING:${perf}`);

  // Скриншот (не обязателен для метрик, но оставим для наглядности)
  await page.screenshot({ path: 'screenshot.png' });
});