# Google reCAPTCHA Project Details

We're using https://www.npmjs.com/package/react-google-recaptcha. This is a react component for Google reCAPTCHA v2. Take a look at the npm package for implementation details.

# Google reCAPTCHA Sitekey Configuration Files

The default reCAPTCHA sitekey is set within the initialConfigState.ts file. This will be used for our local development environments.

Currently our config files are located in the internals/deploy_properties folder under qa-config.json, uat-config.json, and prod-config.json files. Each reCAPTCHA sitekey value within these config files will be used for the corresponding domain.

This reCAPTCHA sitekey is then added to the ReCAPTCHA react component as a prop.

Example: `<ReCAPTCHA sitekey={config-specific-recaptchaSiteKey-value} />`

# Google reCAPTCHA Validation Process

Currently, when a user interacts with the reCAPTCHA checkbox, it will trigger an onChange that provides us with a unique token.

This unique token will then be sent within the header of our Search Guest Order request to the API.

The token will then be validated on that server, which uses a secret key that's also tied to the unique domain and if it is a valid token it will return a successful response.

If the reCAPTCHA token validation fails, the API will return a 400 Bad Request along with an API error code of 136 which is specific to reCAPTCHA failures.

# Google reCAPTCHA Invalid Domain errors

If any of our environment url's change and the recaptcha sitekey is not updated we will receive an 'Invalid Domain' error shown within the reCAPTCHA checkbox.

In order to fix this usse, we will need to request a new recaptcha sitekey for the new url/domain.

Here's the link to submit a request for a new reCAPTCHA sitekey from DTE:
https://dteenergyprod.service-now.com/nav_to.do?uri=%2Fcom.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3D071ea59fdb667b003d3e389239961998
