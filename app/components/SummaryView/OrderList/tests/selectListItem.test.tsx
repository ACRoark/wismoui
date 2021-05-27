import React from 'react';

import createFakeSearchResult from 'components/createFakeSearchResult';

import OrderListItem from '../OrderListItem';
import selectListItem from '../selectListItem';
import TransferOrderListItem from '../TransferOrderListItem';

const shouldNotLogErrors = (orderNumber: string): void => {
  const spy = jest.spyOn(global.console, 'error');

  const order = createFakeSearchResult(orderNumber);

  selectListItem(order);

  expect(spy).not.toHaveBeenCalled();
};

describe('selectListItem', (): void => {
  it('should not log errors in console when the order type is MIMO_START', (): void => shouldNotLogErrors('MI12345678'));

  it('should not log errors in console when the order type is MIMO_STOP', (): void => shouldNotLogErrors('MO12345678'));

  it('should not log errors in console when the order type is MIMO_TRANSFER', (): void => shouldNotLogErrors('MT12345678'));

  it (`should return an OrderListItem when the order type is MIMO_START`, (): void => {
    const order = createFakeSearchResult('MI12345678');

    const item = selectListItem(order);

    expect(item).toStrictEqual(<OrderListItem orderNumber={order.orderNumber} request={order.orderRequests[0]} />);
  });

  it (`should return a OrderListItem when the order type is MIMO_STOP`, (): void => {
    const order = createFakeSearchResult('MO12345678');

    const item = selectListItem(order);

    expect(item).toStrictEqual(<OrderListItem orderNumber={order.orderNumber} request={order.orderRequests[0]} />);
  });

  it (`should return a TransferOrderListItem when the order type is MIMO_TRANSFER`, (): void => {
    const order = createFakeSearchResult('MT12345678');

    const item = selectListItem(order);

    expect(item).toStrictEqual(<TransferOrderListItem order={order} />);
  });
});
