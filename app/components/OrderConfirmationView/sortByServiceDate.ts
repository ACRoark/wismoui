import moment from 'moment';

import { IProduct } from 'types';

const sortByServiceDate = (products: IProduct[]): IProduct[] =>
  products.sort((a: IProduct, b: IProduct): number => moment(b.serviceDate).unix() - moment(a.serviceDate).unix());

export default sortByServiceDate;
