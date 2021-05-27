import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';

import moment from 'moment';

const sortOrderRequestUpdates = (orderRequestUpdates: IOrderRequestStatusUpdate[]): IOrderRequestStatusUpdate[] =>
  orderRequestUpdates.sort(
    (a: IOrderRequestStatusUpdate, b: IOrderRequestStatusUpdate): number =>
      moment(`${a.createdAtDate}T${a.createdAtTime}`).unix() - moment(`${b.createdAtDate}T${b.createdAtTime}`).unix(),
  );

export default sortOrderRequestUpdates;
