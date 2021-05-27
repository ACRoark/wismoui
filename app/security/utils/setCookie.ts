interface ICookieOptions {
  days: number;
  path: string;
}

const setCookie = (name: string, value: string, options: ICookieOptions): void => {
  const expires = new Date(Date.now() + options.days * 864e5).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${options.path}`;
};

export default setCookie;
