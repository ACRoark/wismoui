import { Element } from 'webdriverio';

// eslint-disable-next-line no-undef
const findElement = (selector: string): Promise<Element> => $(selector);

export default findElement;
