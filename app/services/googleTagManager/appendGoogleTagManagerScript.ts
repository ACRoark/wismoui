const appendGoogleTagManagerScript = (id: string, auth?: string, preview?: string): void => {
  const element = document.createElement('script');

  element.type = 'text/javascript';

  const queryString =
    (auth ? `&gtm_auth=${auth}` : '') + (preview ? `&gtm_preview=${preview}` : '') + '&gtm_cookies_win=x';

  element.innerHTML = `<!-- Google Tag Manager -->
  (function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+${queryString ? `'${queryString}'` : ''};
  f.parentNode.insertBefore(j,f);
  })
  (window,document,'script','dataLayer','${id}');
  <!-- End Google Tag Manager -->`;

  document.head.appendChild(element);
};

export default appendGoogleTagManagerScript;
