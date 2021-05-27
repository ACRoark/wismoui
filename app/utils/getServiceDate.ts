import IOrderRequest from '../types/IOrderRequest';

const getServiceDate = (serviceRequest: IOrderRequest): string | null => {
  const { serviceOrderEvents, products } = serviceRequest;

  return (
    products[products.length - 1]?.serviceDate ||
    serviceOrderEvents[serviceOrderEvents.length - 1]?.appointment.date ||
    null
  );
};

export default getServiceDate;
