const waitUntilPageLoads = (url: string): Promise<boolean> =>
  // eslint-disable-next-line no-undef
  browser.waitUntil(
    (): Promise<boolean> =>
      // eslint-disable-next-line no-undef
      browser.getUrl().then((browserUrl: string): boolean => browserUrl === url),
  );

export default waitUntilPageLoads;
