const appendGoogleTagManagerFrame = (id: string, auth?: string, preview?: string): void => {
  const element = document.createElement('noscript');

  const frame = document.createElement('iframe');

  frame.height = '0';
  frame.style.display = 'none';
  frame.style.visibility = 'hidden';
  frame.width = '0';

  const queryString =
    (auth ? `&gtm_auth=${auth}` : '') + (preview ? `&gtm_preview=${preview}` : '') + '&gtm_cookies_win=x';

  frame.src = `https://www.googletagmanager.com/ns.html?id=${id}${queryString}`;

  element.appendChild(frame);

  document.body.insertBefore(element, null);
};

export default appendGoogleTagManagerFrame;
