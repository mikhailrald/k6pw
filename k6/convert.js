
const fs = require('fs');

const log = fs.readFileSync('playwright.log', 'utf8');
const match = log.match(/PERF_TIMING:(\{.*\})/);
const timing = match ? JSON.parse(match[1]) : {};

const metrics = {
  domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
  load: timing.loadEventEnd - timing.navigationStart
};

fs.writeFileSync('k6/metrics.json', JSON.stringify(metrics, null, 2));
console.log('Extracted metrics:', metrics);
