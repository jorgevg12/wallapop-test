import { http, HttpResponse } from 'msw';
import data from './data/data.json';

export const handlers = [
  http.get('/api/items', (req) => {
    return HttpResponse.json(data);
  }),
];

