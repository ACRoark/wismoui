const isOrderInvalid = (orderNumber: string): boolean => !/^[Mm][IiTtOo]\d{8}$/g.test(orderNumber);

export default isOrderInvalid;
