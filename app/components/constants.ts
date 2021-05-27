import IApplicationConfig from 'types/IApplicationConfig';

export const PageTitles = Object.freeze({
  ORDER_STATUS_PAGE: 'Track Your Order | DTE Energy',
  SEARCH_PAGE: 'Order Tracker | DTE Energy',
  SUMMARY_PAGE: 'Track Your Order | DTE Energy',
});

export const testConfig: IApplicationConfig = {
  flags: {
    canChangeLanguage: false,
    developerMode: false,
  },
  gigyaSiteKey: 'foo',
  googleTagManagerConfig: {
    auth: 'p3zyt1YCX84XB82sOrjMGw', // '',
    id: 'GTM-K2WP588', // 'GTM-PBB6QZ4',
    preview: 'env-1', // '',
  },
  loading: true,
  recaptchaSitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  urls: {
    assistanceURL: 'https://www.dteenergy.com',
    backToDTE: 'https://www.dteenergy.com',
    backToMIMO: 'https://www.dteenergy.com',
    contactUs: 'https://www.contact.us.com',
    createAccount: 'https://www.create.account.com',
    decryptTokenApi: 'https://web-test.dteenergy.com/api/decryptToken?detokenizeValue=',
    documentSubmission: 'https://web-test.dteenergy.com/wps/wcm/connect/dte-web/quicklinks/web-form?detokenizeValue=',
    dynatraceScript:
      'https://dynatrace.dteenergy.com:9999/jstag/managed/98834406-1ae1-4257-992c-5b3c5f828584/968d8c7df07fe18c_complete.js',
    editPhoneNumber: 'https://www.edit.phone.number.com',
    editWantDate: 'https://www.edit.service.date.com',
    encryptTokenApi: 'https://web-test.dteenergy.com/api/encryptToken',
    findOrder: 'https://firebase.or.jsonserver/orders/{orderNumber}?name={name}',
    getOrder: 'https://firebase.or.jsonserver/orders/{orderNumber}',
    guestPay: 'https://www.guest.pay.com',
    headerLogo: 'https://www.header.logo.com',
    privacyPolicy: 'https://www.privacy.policy.com',
    searchOrders: 'https://firebase.or.jsonserver/orders',
    signIn: 'https://www.sign.in.com',
    termsAndConditions: 'https://www.terms.and.conditions.com',
  },
};
