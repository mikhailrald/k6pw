import { check } from 'k6';
import { SharedArray } from 'k6/data';

// Загружаем метрики
const metrics = new SharedArray('metrics', function () {
  return [JSON.parse(open('./metrics.json'))];
});

export const options = {
  thresholds: {
    'domContentLoaded': ['p(95)<2000'],
    'load': ['p(95)<3000'],
    'fcp': ['p(95)<2500'],
    'lcp': ['p(95)<3000'],
    'tti': ['p(95)<3500']
  }
};

export default function () {
  const metric = metrics[0];

  check(metric, {
    'domContentLoaded < 2000ms': (m) => m.domContentLoaded < 2000,
    'load < 3000ms': (m) => m.load < 3000,
    'fcp < 2500ms': (m) => m.fcp < 2500,
    'lcp < 3000ms': (m) => m.lcp < 3000,
    'tti < 3500ms': (m) => m.tti < 3500
  });
}
