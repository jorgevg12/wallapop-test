import { delay, http, HttpResponse } from 'msw';
import data from './data/data.json';
import { Data, Item } from '../app/types/types';

const ITEMS_PER_PAGE = 5;

export const handlers = [
  http.get('/api/items', async (req) => {

    //To emulate an error response uncomment the following block:

    // return new HttpResponse('Not found', {
    //   status: 404,
    //   headers: {
    //     'Content-Type': 'text/plain',
    //   },
    // })
    
    const queryParams = getQueryParams(req.request.url);
    const search = queryParams['search'];
    const page = parseInt(queryParams['page'] || '1', 10);
    const normalizedSearchWords = normalizeText(search || '').split(' ');
    const filteredData = filterData(data, normalizedSearchWords);
    const paginatedData = paginateData(filteredData, page, ITEMS_PER_PAGE);
    await delay(3000);
    return HttpResponse.json({ items: paginatedData, pagesAvailable: Math.ceil(filteredData.length / ITEMS_PER_PAGE) });
  }),
];

const getQueryParams = (url: string) => {
  const params = new URL(url).searchParams;
  const queryParams: { [key: string]: string } = {};
  params.forEach((value, key) => {
    queryParams[key] = value;
  });
  return queryParams;
};

const normalizeText = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const filterData = (data: Data, normalizedSearchWords: string[]): Item[] => {
  return data.items.filter(item => {
    const normalizedTitle = normalizeText(item.title);
    const normalizedDescription = normalizeText(item.description);
    const normalizedPrice = normalizeText(item.price);
    const normalizedEmail = normalizeText(item.email);

    return normalizedSearchWords.every(word =>
      normalizedTitle.includes(word) ||
      normalizedDescription.includes(word) ||
      normalizedPrice.includes(word) ||
      normalizedEmail.includes(word)
    );
  });
};

const paginateData = (items: Item[], page: number, itemsPerPage: number): Item[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};