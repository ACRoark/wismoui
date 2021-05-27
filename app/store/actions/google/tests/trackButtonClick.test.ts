import googleTagManager from 'services/googleTagManager';
import mockState from 'testing/mockState';
import { IApplicationRootState } from 'types';

import createFakeOrder from 'components/createFakeOrder';
import { initialTrackerState } from 'store/defaults';

import trackButtonClick from '../trackButtonClick';

jest.mock('services/googleTagManager');

const mockTagManager = googleTagManager as jest.Mocked<typeof googleTagManager>;

const orders = [
                 {dataTrackDetail:'start', orderNumber:'MI12345678'},
                 {dataTrackDetail:'stop', orderNumber:'MO12345678'},
                 {dataTrackDetail:'transfer', orderNumber:'MT12345678'}
               ];

orders.forEach((order: {dataTrackDetail: string, orderNumber: string}): void => {
  describe('trackButtonClick', (): void => {
    const mockDispatch = jest.fn();
    const dataTrackSubAction = 'whatever';
    const fakeOrder = createFakeOrder(order.orderNumber);

    it('should send the tag names to the tag manager when the buttons are clicked', async (): Promise<void> => {
       const action = trackButtonClick(dataTrackSubAction);
       const state: IApplicationRootState = {
         ...mockState,
         tracker: {
           ...initialTrackerState,
           order: fakeOrder
         }
       };

       const getState = (): IApplicationRootState => state;

       await action(mockDispatch, getState, {});

       expect(mockTagManager.trackButtonClick).toBeCalledWith(state.router.location, order.dataTrackDetail , dataTrackSubAction);
      });
  });
});
