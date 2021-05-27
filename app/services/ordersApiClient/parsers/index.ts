import parseDateTime from './parseDateTime';
import parseOrderNumber from './parseOrderNumber';
import parsePhoneNumber from './parsePhoneNumber';

const parse = {
  dateTime: parseDateTime,
  orderNumber: parseOrderNumber,
  phoneNumber: parsePhoneNumber,
};

export default parse;
