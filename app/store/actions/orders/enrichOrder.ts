import moment from 'moment';

import { IOrder, IOrderRequest } from 'types';

import sortOrderRequestUpdates from 'utils/sortOrderRequestUpdates';

// Temporary hack to ensure we have the fake data available
const enrichOrder = (order: IOrder): IOrder => {
  order.orderRequests.forEach((request: IOrderRequest): void => {
    request.contactPhoneNumber = request.contactPhoneNumber || '2483334444';

    if (request.orderRequestStatusUpdates) {
      if (request.orderRequestStatusUpdates.length === 0) {
        const createdAt = moment(order.createdAt);

        request.orderRequestStatusUpdates = [
          {
            createdAtDate: createdAt.format('YYYYMMDD'),
            createdAtTime: createdAt.format('HHmmss'),
            orderRequestStatus: 'REQUESTED',
          },
        ];
      } else {
        request.orderRequestStatusUpdates = sortOrderRequestUpdates(request.orderRequestStatusUpdates);
      }
    } else {
      request.orderRequestStatusUpdates = request.orderRequestStatusUpdates || [
        {
          createdAtDate: '20200419',
          createdAtTime: '131530',
          orderRequestStatus: 'REQUESTED',
        },
        {
          createdAtDate: '20200421',
          createdAtTime: '092215',
          orderRequestStatus: 'PROCESSED',
        },
        {
          createdAtDate: '20200422',
          createdAtTime: '223443',
          orderRequestStatus: 'SCHEDULED',
        },
      ];
    }

    request.products = request.products || [
      {
        productType: 'EFR_D1',
        serviceDate: '2020-05-22',
      },
    ];

    request.wantDate = request.wantDate || '20200522';
  });

  return order;
};

export default enrichOrder;
