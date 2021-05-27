import * as React from 'react';

import './index.less';

interface DteContactNumberProps {
  value?: string;
}

const DteContactNumber: React.FC<DteContactNumberProps> = (props: DteContactNumberProps): React.ReactElement => {
  const { value } = props;
  const contactNumber = value || '8004774747';

  return (
    <a className="dte-wismo-dte-contact-number" href={`tel:+${contactNumber}`}>
      {`${contactNumber.slice(0, 3)}.${contactNumber.slice(3, 6)}.${contactNumber.slice(6, 10)}`}
    </a>
  );
};

export default DteContactNumber;
