import { IApplicationConfig } from 'types';

//
// These should be set to QA values.
// These defaults take affect when no overrides are present in the config.json file.
// So keep the potential consequences in mind when setting!
//
// Production and local values should be set in the config.json file.
//
const initialConfigState: IApplicationConfig = {
  flags: {
    bug2263: false,
    bug3665: false,
    bug3883: false,
    canChangeLanguage: false,
    developerMode: false,
    us1599: false,
    us3273: false,
  },
  gigyaSiteKey: '3_e_qjd_hIEv1YYw2ihp_u8_g0aH6VU8krGaXYYJgWWi-XzqmCBGsmZOYvhauDmlzp',
  googleTagManagerConfig: {
    auth: 'eljFL0slkoaOTglOS-L5-Q', // 'p3zyt1YCX84XB82sOrjMGw',
    id: 'GTM-PBB6QZ4', // 'GTM-K2WP588',
    preview: 'env-20', // 'env-1',
  },
  loading: true,
  recaptchaSitekey: '6Ld_3KMZAAAAAKMLWGtoK5-a_LuzBLxWgA2b52CH',
  urls: {
    assistanceURL:
      'https://web-test.dteenergy.com/wps/wcm/connect/dte-web/home/billing-and-payments/residential/energy-assistance/general-assistance',
    backToDTE: 'https://web-test.dteenergy.com',
    backToMIMO: 'https://web-test.dteenergy.com/commercial/core-mimo/',
    contactUs: 'https://newlook.dteenergy.com/wps/wcm/connect/dte-web/quicklinks/footer/03+contact+us',
    createAccount: 'https://qa.registration.dteenergy.com',
    decryptTokenApi: 'https://web-test.dteenergy.com/api/decryptToken',
    documentSubmission: 'https://newlook.dteenergy.com/wps/wcm/connect/dte-web/quicklinks/web-form?detokenizeValue=',
    dynatraceScript: '',
    editPhoneNumber: 'https://web-test.dteenergy.com/commercial/mimo-modify/',
    editWantDate: 'https://web-test.dteenergy.com/commercial/mimo-modify/',
    encryptTokenApi: 'https://web-test.dteenergy.com/api/encryptToken',
    // findOrder: 'https://test.api.customer.sites.dteenergy.com/public/wismo/int/orders/{orderNumber}?name={name}',
    findOrder: 'http://localhost:3001/{orderNumber}?q={name}',
    // getOrder: 'https://test.api.customer.sites.dteenergy.com/public/wismo/int/users/orders/{orderNumber}',
    getOrder: 'http://localhost:3001/{orderNumber}',
    guestPay: 'https://payment.web-test.dteenergy.com/guest-pay',
    headerLogo: 'https://web-test.dteenergy.com/commercial/core-mimo/',
    privacyPolicy:
      'https://newlook.dteenergy.com/wps/wcm/connect/dte-web/quicklinks/footer/customer+data+privacy+policy',
    // searchOrders:
     //  'https://test.api.customer.sites.dteenergy.com/public/wismo/int/users/orders?includeClosedOrders=true',
    searchOrders: 
    'http://localhost:3001/AuthorizedMockData',
    signIn: 'https://web-test.dteenergy.com/wps/wcm/connect/dte-web/login',
    termsAndConditions: 'https://newlook.dteenergy.com/wps/wcm/connect/dte-web/quicklinks/footer/terms-and-conditions',
  },
};

export default initialConfigState;
