import generate from 'testing/generators';
import { IOrderRequestInfo } from 'types';

import getTitleData from '../getTitleData';

const officeStatusCode = 'AD';

const orderWithErrors: IOrderRequestInfo = {
  ...generate.orderRequestInfo(),
  currentOrderRequestStatus: {
    ...generate.orderRequestStatusUpdate(),
    orderRequestStatus: 'NEEDS_VERIFICATION',
  },
  verificationEvents: [
    {
      latestVerificationEventStatusUpdate: {
        createdAtDate: '20200520',
        createdAtTime: '092215',
        verificationCode: officeStatusCode,
        verificationEventStatus: 'ACTIVE',
      },
      verificationCategory: 'does not matter',
      verificationEventId: 'does not matter',
    },
  ],
};

const orderWithoutErrors: IOrderRequestInfo = {
  ...generate.orderRequestInfo(),
  currentOrderRequestStatus: {
    ...generate.orderRequestStatusUpdate(),
    orderRequestStatus: 'PROCESSED',
  },
};

describe('getTitleData', (): void => {
  describe('classNames', (): void => {
    it('should include "error" when there is a BPEM', (): void => {
      const data = getTitleData(orderWithErrors);

      expect(data.classNames).toContain('error');
    });

    it('should not include "error" when there is no BPEM', (): void => {
      const data = getTitleData(orderWithoutErrors);

      expect(data.classNames).not.toContain('error');
    });
  });

  describe('errorMessage', (): void => {
    it('should include the Office Status Code when there is a BPEM', (): void => {
      const data = getTitleData(orderWithErrors);

      expect(data.errorMessage).toContain(officeStatusCode);
    });

    it('should be an empty string when there is no BPEM', (): void => {
      const data = getTitleData(orderWithoutErrors);

      expect(data.errorMessage).not.toContain(officeStatusCode);
    });
  });

  describe('prefix', (): void => {
    it('should be an exclamation point when there is a BPEM', (): void => {
      const data = getTitleData(orderWithErrors);

      expect(data.prefix).toContain('!');
    });

    it('should be an empty string when there is no BPEM', (): void => {
      const data = getTitleData(orderWithoutErrors);

      expect(data.prefix).not.toContain('!');
    });
  });
});
