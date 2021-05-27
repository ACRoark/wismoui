const appendGigyaScript = (apiKey: string): Promise<void> =>
  // tslint:disable-next-line: typedef
  new Promise<void>((resolve) => {
    if (!apiKey) {
      resolve();
    }

    const script = document.createElement('script');

    script.crossOrigin = 'anonymous';
    script.src = `https://cdns.gigya.com/JS/gigya.js?apiKey=${apiKey}`;

    document.head.appendChild(script);

    script.onload = (): void => resolve();
  });

export default appendGigyaScript;
