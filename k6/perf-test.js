
import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const metrics = new SharedArray('metrics', function () {
  return [JSON.parse(open('./metrics.json'))];
});

export const options = {
  thresholds: {
    'domContentLoaded': ['p(95)<2000'],
    'load': ['p(95)<3000'],
  }
};

export default function () {
  const metric = metrics[0];

  check(metric, {
    'domContentLoaded < 2000ms': (m) => m.domContentLoaded < 2000,
    'load < 3000ms': (m) => m.load < 3000
  });
}
