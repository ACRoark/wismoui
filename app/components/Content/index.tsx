import React, { FC, ReactElement, ReactNode } from 'react';

import './index.less';

interface IContentProps {
  children: ReactNode;
}

const Content: FC<IContentProps> = (props: IContentProps): ReactElement => (
  <div className="dte-wismo-content">{props.children}</div>
);

export default Content;
