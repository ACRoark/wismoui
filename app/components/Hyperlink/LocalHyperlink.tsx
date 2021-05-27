/**
 * A link to a certain page, an anchor tag
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { IBaseHyperlinkProps } from './types';

const LocalHyperlink: React.FC<IBaseHyperlinkProps> = (props: IBaseHyperlinkProps): React.ReactElement => {
  const { children, href, target } = props;

  return (
    <Link to={`${href}`} target={target || '_self'}>
      {React.Children.toArray(children)}
    </Link>
  );
};

export default LocalHyperlink;
