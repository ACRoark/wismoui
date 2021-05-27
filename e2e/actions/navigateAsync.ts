const navigateAsync = (url: string): Promise<void> => browser.url(url);

export default navigateAsync;
