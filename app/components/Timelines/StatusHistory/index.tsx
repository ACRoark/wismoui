import Timeline from 'antd/lib/timeline';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import IOrderRequest from 'types/IOrderRequest';
import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';
import getServiceDate from 'utils/getServiceDate';
import sortOrderRequestUpdates from 'utils/sortOrderRequestUpdates';

import filterDuplicateStatusUpdates from './filterDuplicateStatusUpdates';
import messages from './messages';

import '../index.less';

interface IStatusHistoryProps {
  order: IOrderRequest;
  orderCreatedDate: string;
}

const StatusHistory: React.FC<IStatusHistoryProps> = (props: IStatusHistoryProps): React.ReactElement => {
  const {
    order,
    order: { orderRequestStatusUpdates },
    orderCreatedDate,
  } = props;

  // add a REQUESTED status, and if missing add a SCHEDULED status
  const orderRequestedUpdate: IOrderRequestStatusUpdate = {
    orderRequestStatus: 'REQUESTED',
    createdAtDate: moment(orderCreatedDate).format('YYYYMMDD'),
    createdAtTime: moment(orderCreatedDate).format('HHmmss'),
  };
  const prependedOrderRequestStatusUpdates = [orderRequestedUpdate, ...orderRequestStatusUpdates];
  const hasScheduledStatus = orderRequestStatusUpdates.find(
    (update: IOrderRequestStatusUpdate): boolean => update.orderRequestStatus === 'SCHEDULED',
  );
  const serviceDate = getServiceDate(order) || orderCreatedDate;
  const orderScheduledUpdate: IOrderRequestStatusUpdate | undefined = !hasScheduledStatus
    ? {
        orderRequestStatus: 'SCHEDULED',
        createdAtDate: moment(serviceDate).format('YYYYMMDD'),
        createdAtTime: '000000',
      }
    : undefined;
  const updatedCompletedDate = prependedOrderRequestStatusUpdates.map(
    (update: IOrderRequestStatusUpdate): IOrderRequestStatusUpdate => {
      if (update.orderRequestStatus === 'AWAITING_BILLING') {
        return {
          createdAtDate: serviceDate,
          createdAtTime: '000000',
          orderRequestStatus: 'AWAITING_BILLING',
        };
      }

      return update;
    },
  );
  const updatedStatuses = orderScheduledUpdate
    ? sortOrderRequestUpdates([orderScheduledUpdate, ...updatedCompletedDate])
    : updatedCompletedDate;

  return (
    <Timeline className="dte-wismo-timeline">
      {filterDuplicateStatusUpdates(updatedStatuses).map(
        (update: IOrderRequestStatusUpdate): ReactElement => (
          <Timeline.Item color="gray" key={update.orderRequestStatus}>
            <FormattedMessage
              {...messages[update.orderRequestStatus]}
              values={{ window: <DateStamp value={update.createdAtDate} /> }}
            />
          </Timeline.Item>
        ),
      )}
    </Timeline>
  );
};

export default StatusHistory;
