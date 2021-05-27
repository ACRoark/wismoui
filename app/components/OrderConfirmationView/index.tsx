import * as _ from 'lodash';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import BillingInformation from 'components/BillingInformation';
import Button from 'components/Button';
import StatusHistory from 'components/Timelines/StatusHistory';
import useModal from 'hooks/useModal';
import IClosedDetails from 'types/IClosedDetails';
import IOrderRequest from 'types/IOrderRequest';

import getStep from './getStep';
import messages from './messages';

import './index.less';

interface IOrderConfirmationViewProps {
  closedDetails: IClosedDetails | null;
  order: IOrderRequest;
  orderCreatedDate: string;
}

const OrderConfirmationView: React.FC<IOrderConfirmationViewProps> = (
  props: IOrderConfirmationViewProps,
): React.ReactElement => {
  const { closedDetails, order, orderCreatedDate } = props;
  const { orderRequestStatusUpdates, orderRequestType } = order;

  const { showModal } = useModal();

  const showStatusHistoryModal = (): void => {
    showModal({
      className: 'dte-wismo-status-history-modal',
      content: <StatusHistory order={order} orderCreatedDate={orderCreatedDate} />,
      title: <FormattedMessage {...messages[orderRequestType]} />,
    });
  };

  const AvailableBillingInformation = _.find(orderRequestStatusUpdates, { orderRequestStatus: 'COMPLETED' }) && (
    <BillingInformation requestType={orderRequestType} />
  );

  return (
    <div className="dte-wismo-order-confirmation-view">
      {getStep(closedDetails, order)}
      <div className="view-status-history-link">
        <Button className="view-status-history-button" type="link" onClick={showStatusHistoryModal}>
          <FormattedMessage {...messages.viewStatusHistoryButtonText} />
        </Button>
      </div>
      {AvailableBillingInformation}
    </div>
  );
};

export default OrderConfirmationView;
