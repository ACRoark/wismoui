import * as React from 'react';
import { Link } from 'react-router-dom';

import AccountNumber from 'components/AccountNumber';
import Button from 'components/Button';
import Currency from 'components/Currency';
import CustomerName from 'components/CustomerName';
import DateStamp from 'components/DateStamp';
import Hyperlink from 'components/Hyperlink';
import OrderNumber from 'components/OrderNumber';
import PhoneNumber from 'components/PhoneNumber';
import ProductList from 'components/ProductList';
import useModal from 'hooks/useModal';

import { fakeProductList } from './constants';

import './index.less';

const ModalContent = <div>Hello, WISMO!</div>;
const TestPage: React.FC = (): React.ReactElement => {
  const { hideModal, showModal } = useModal();

  const linkButtonClicked = (): void => showModalContent('Link button clicked');
  const primaryButtonClicked = (): void => showModalContent('Primary button clicked');
  const secondaryButtonClicked = (): void => showModalContent('Secondary button clicked');

  const showModalContent = (title: string): void =>
    showModal({
      content: ModalContent,
      footer: <Button onClick={hideModal}>Close</Button>,
      title,
    });

  return (
    <div className="dte-wismo-testpage">
      <h1>This is the test\demo page for custom components</h1>
      <div>
        <Link to="/orders/MI12345678">StartOrder</Link>
        <br />
        <Link to="/orders/MO12345678">StopOrder</Link>
        <br />
        <Link to="/orders/MT12345678">Transfer Order</Link>
      </div>
      <div>
        <h4>Account Number component:</h4>
        <div className="indented">
          <AccountNumber value="927530986753" />
        </div>
      </div>
      <div>
        <h4>Button component:</h4>
        <div className="indented">
          <Button onClick={linkButtonClicked} type="link">
            Link
          </Button>
          &nbsp;
          <Button disabled type="link">
            Link (Disabled)
          </Button>
          &nbsp;
          <Button onClick={primaryButtonClicked} type="primary">
            Primary
          </Button>
          &nbsp;
          <Button disabled type="primary">
            Primary (Disabled)
          </Button>
          &nbsp;
          <Button onClick={secondaryButtonClicked} type="secondary">
            Secondary
          </Button>
          &nbsp;
          <Button disabled type="secondary">
            Secondary (Disabled)
          </Button>
        </div>
      </div>
      <div>
        <h4>Currency components:</h4>
        <div className="indented">
          <Currency value={1000} />
          <br />
          <Currency value={-1.23} />
          <br />
          <Currency value=".59" />
          <br />
          <Currency value="1" />
        </div>
      </div>
      <div>
        <h4>Customer Info:</h4>
        <h4 className="customer-name indented">
          <CustomerName name="Adam Naglich" />
        </h4>
        <p className="indented phone-number">
          <PhoneNumber value="1234567890" />
          <button className="edit-button" type="button">
            Edit number
          </button>
        </p>
      </div>
      <div>
        <h4>Customer Name component:</h4>
        <div className="indented">
          <CustomerName name="Adam Naglich" />
        </div>
      </div>
      <div>
        <h4>Date Stamp component:</h4>
        <div className="indented">
          Long: <DateStamp format="long" value="2020/04/13" />
          <br />
          Short: <DateStamp format="short" value="2020/04/13" />
          <br />
          ISO Date Long: <DateStamp format="long" value="2020-03-19T13:15:30Z" />
          <br />
          ISO Date Short: <DateStamp format="short" value="2020-03-19T13:15:30Z" />
        </div>
      </div>
      <div>
        <h4>Hyperlink component:</h4>
        <div className="indented">
          Internal URL: <Hyperlink href="/">Home</Hyperlink>
          <br />
          External URL: <Hyperlink href="http://www.dteenergy.com">DTE Energy</Hyperlink>
        </div>
      </div>
      <div>
        <h4>Order Number component:</h4>
        <div>
          <OrderNumber value="MI12345678" />
        </div>
      </div>
      <div>
        <h4>Phone Number component:</h4>
        <div className="indented">
          7-Digits: <PhoneNumber value="1234567" />
          <br />
          10-Digits: <PhoneNumber value="1234567890" />
        </div>
      </div>
      <div>
        <h4>Product List component:</h4>
        <div className="indented">
          <ProductList products={fakeProductList} />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
