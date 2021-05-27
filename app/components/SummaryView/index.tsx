import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IOrderSearchResult } from 'types';

import ColumnLayout from 'components/ColumnLayout';
import messages from './messages';
import OrdersList from './OrderList';

import './index.less';

interface ISummaryViewProps {
  results: IOrderSearchResult[];
}

const SummaryView: React.FC<ISummaryViewProps> = (props: ISummaryViewProps): React.ReactElement => {
  const { results } = props;

  return (
    <ColumnLayout>
      <div className="dte-wismo-summary-view">
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>
        <OrdersList orders={results} />
      </div>
    </ColumnLayout>
  );
};

export default SummaryView;
