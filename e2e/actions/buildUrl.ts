// eslint-disable-next-line no-undef
const buildUrl = (relativePath: string): string => `${browser.config.baseUrl}${relativePath}`;

export default buildUrl;
