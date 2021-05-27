import React from 'react';
import { FormattedMessage } from 'react-intl';

import ColumnLayout from 'components/ColumnLayout';
import Hyperlink from 'components/Hyperlink';
import OrderNumber from 'components/OrderNumber';
import useSearch from 'hooks/useSearch';
import BackArrow from 'images/BackArrow';
import { userIsAuthenticated } from 'security/utils';

import messages from './messages';

import './index.less';

interface IServiceRequestViewHeaderProps {
  serviceRequestNumber: string;
}

const ServiceRequestViewHeader: React.FC<IServiceRequestViewHeaderProps> = (
  props: IServiceRequestViewHeaderProps,
): React.ReactElement => {
  const { serviceRequestNumber } = props;
  const { results = [] } = useSearch();
  const userHasMultipleOrders = results.length > 1;

  const renderBackLink = (isAuthenticated: boolean, multipleOrders: boolean): React.ReactElement => {
    if (isAuthenticated) {
      return multipleOrders ? (
        <div className="back-link" data-testid="back-link">
          <Hyperlink href="/">
            <BackArrow />
            <FormattedMessage {...messages.backToAllOrders} />
          </Hyperlink>
        </div>
      ) : (
        <div />
      );
    }

    return (
      <div className="back-link" data-testid="back-link">
        <Hyperlink href="/">
          <BackArrow />
          <FormattedMessage {...messages.backToSearchPage} />
        </Hyperlink>
      </div>
    );
  };

  return (
    <div className="dte-wismo-service-request-view-header">
      <ColumnLayout>
        <div className="dte-wismo-service-request-view-header-content">
          {renderBackLink(userIsAuthenticated(), userHasMultipleOrders)}
          <div className="service-request-number">
            <span className="label">
              <FormattedMessage {...messages.orderNumber} />
            </span>
            <OrderNumber value={serviceRequestNumber} />
          </div>
        </div>
      </ColumnLayout>
    </div>
  );
};

export default ServiceRequestViewHeader;
