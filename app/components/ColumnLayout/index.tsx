import * as React from 'react';

import './index.less';

const ColumnLayout: React.FC = (props: React.PropsWithChildren<React.ReactElement>): React.ReactElement => (
  <div className="dte-wismo-column-layout">{props.children}</div>
);

export default ColumnLayout;
