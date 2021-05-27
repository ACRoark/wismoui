const hasErrorFromAPI = (errorCode: number): string => {
  switch (errorCode) {
    case 400:
      return 'RECAPTCHA_FAILED';
    case 404:
      return 'ORDER_NOT_FOUND';
    case 500:
    case 502:
    case 503:
      return 'SERVER_UNAVAILABLE';
    default:
      return '';
  }
};

export default hasErrorFromAPI;
