import getRuntimeEnvironment from './getRuntimeEnvironment';

interface IRuntimeSettings {
  baseUrl: string;
}

const getRuntimeSettings = (): IRuntimeSettings => {
  const environment = getRuntimeEnvironment();

  switch (environment) {
    case 'PREVIEW':
      return {
        baseUrl: 'https://preview.orderstatus.dteenergy.com',
      };
    case 'PROD':
      return {
        baseUrl: 'https://orderstatus.dteenergy.com',
      };
    case 'QA':
      return {
        baseUrl: 'https://qa.orderstatus.dteenergy.com',
      };
    default:
      return {
        baseUrl: 'http://dev.orderstatus.dteenergy.com:81',
      };
  }
};

export default getRuntimeSettings;
