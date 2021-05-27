const getCookie = (name: string): string =>
  document.cookie.split('; ').reduce((previousValue: string, currentValue: string): string => {
    const parts = currentValue.split('=');

    return parts[0] === name ? decodeURIComponent(parts[1]) : previousValue;
  }, '');

export default getCookie;
