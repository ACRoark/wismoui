import { IOrderSearchResult } from 'types';

import generate from './generate';
import generateSearchResult from './generateSearchResult';

const generateSearchResults = (minCount: number = 1, maxCount: number = 20): IOrderSearchResult[] => {
  const count = generate.randomNumber(minCount, maxCount);

  const results: IOrderSearchResult[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generateSearchResult());
  }

  return results;
};

export default generateSearchResults;
