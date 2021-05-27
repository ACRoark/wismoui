// tslint:disable-next-line: no-any
const pushDataLayer = (args: any): void => {
  // eslint-disable-next-line dot-notation
  const dl = window['dataLayer'];

  if (dl) {
    dl.push(args);
  }
};

export default pushDataLayer;
