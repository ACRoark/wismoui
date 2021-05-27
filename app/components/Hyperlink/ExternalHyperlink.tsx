/**
 * A link to a certain page, an anchor tag
 */
import React from 'react';

import ExternalLinkIcon from 'images/ExternalLinkIcon';
import { IBaseHyperlinkProps } from './types';

const ExternalHyperlink: React.FC<IBaseHyperlinkProps> = (props: IBaseHyperlinkProps): React.ReactElement => {
  const { children, href, target } = props;

  return (
    <a href={`${href}`} target={target || '_blank'}>
      <ExternalLinkIcon />
      {React.Children.toArray(children)}
    </a>
  );
};

export default ExternalHyperlink;
