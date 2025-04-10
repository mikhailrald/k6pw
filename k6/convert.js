const fs = require('fs');

// Считываем лог
const log = fs.readFileSync('playwright.log', 'utf8');

// Извлекаем данные
const match = log.match(/PERF_TIMING:(\{.*\})/);
const timing = match ? JSON.parse(match[1]) : {};

// Вычисляем метрики
const metrics = {
  domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
  load: timing.loadEventEnd - timing.navigationStart,
  fcp: timing.firstContentfulPaint - timing.navigationStart,
  lcp: timing.largestContentfulPaint - timing.navigationStart,
  tti: timing.domInteractive - timing.navigationStart
};

// Записываем метрики в файл
fs.writeFileSync('k6/metrics.json', JSON.stringify(metrics, null, 2));
console.log('Extracted metrics:', metrics);
