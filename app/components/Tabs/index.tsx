import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import './index.less';

interface ITabsProps {
  selectionChanged: (str: string) => void;
}

const Tabs: React.FC<ITabsProps> = (props: ITabsProps): React.ReactElement => {
  const { selectionChanged } = props;
  const [tab, setTab] = useState('start');

  const handleStart = (): void => {
    setTab('start');
  };

  const handleStop = (): void => {
    setTab('stop');
  };

  const start = tab === 'start' ? 'selected' : 'unselected';
  const stop = tab === 'stop' ? 'selected' : 'unselected';

  useEffect((): void => {
    selectionChanged(tab);
  }, [tab]);

  return (
    <>
      <div className="dte-wismo-tabs">
        <div className={`dte-wismo-tabs-left dte-wismo-tabs-${start} `} onClick={handleStart}>
          <FormattedMessage {...messages.startService} />
        </div>
        <div className={`dte-wismo-tabs-${stop}`} onClick={handleStop}>
          <FormattedMessage {...messages.stopService} />
        </div>
      </div>
    </>
  );
};

export default Tabs;
