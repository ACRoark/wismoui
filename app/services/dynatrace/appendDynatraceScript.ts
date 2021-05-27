const appendDynatraceScript = (url: string): void => {
  if (url) {
    const script = document.createElement('script');

    script.crossOrigin = 'anonymous';
    script.src = url;
    script.type = 'text/javascript';

    document.head.appendChild(script);
  }
};

export default appendDynatraceScript;
