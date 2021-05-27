# Application Security

The application is intended to be accessed one of three ways:

1. From links within the dteenergy.com website
2. From links embedded within notification emails
3. From links embedded within SMS (text) notification messages

Certain areas and features of the application are restricted to authenticated customers only.

The following describes the basic flow of the application when a customer browses to the root of the application (i.e. not to a page within the application using a direct link):

1. Before anything is rendered, the Auth Provider attempts to authenticate the user (see [authenticating customers](#authenticating-customers)). A Loading Indicator is shown while this takes place.

2. Once the Auth Provider has a response, the user is routed to the Home Page which determines whether they were authenticated or not.

3. If the customer is authenticated,

   1. They are redirected to the Summary Page which will request the list of current and past orders for the current customer from the WISMO Engine API (by passing a JWT representing the user's identity with the request).
   2. If the customer has more than one order,
      1. The Summary page will display them allowing the customer to select which order they would like to view in the Status page.
      2. In this case, the customer may navigate back and forth between the Summary and Status pages at will.
   3. If the customer only has one order,
      1. They will immediately be redirected to the Status page.
      2. They will not be able to return to the Summary page.
   4. If the customer has no orders,
      1. An error message will be displayed

4. If the customer is not authenticated,
   1. They are redirected to the Search page (aka, "Guest Login Page") where they must provide their name, order number and a Captcha code to proceed.
   2. Assuming the information is correct and corresponds to an open Order, they will be redirected to the Status page for that Order
   3. The customer may only return to the Search page to search for another Order.

## Direct Links (aka Deep Linking)

The application supports navigation directly to specific pages in the application using links embedded in emails or SMS messages, etc.

These links will attempt to access the Status page but route protection will redirect the user to the Search (aka, "Guest Login Page"). The customer's name and order number will be taken from the URL to prepopulate the search form. The customer will still have to enter the Captcha code to continue.

## Authenticating Customers

The application never really authenticates customers. That is handled by the dteenergy.com website which collects and validates customer credentials then creates a Single Sign-On (SSO) session that is used by this application to validate whether the customer was authenticated or not.

To do this, the application simply requests a JSON Web Token (JWT) from the Identity Provider for the current session. If no session exists, meaning the user has not been authenticated, no token is returned. However, if the user has been authenticated, a JWT is returned and stored in state so it may be used when making requests to the WISMO Engine API.

Please note the application does nothing with the JWT other than send it in the Authorize header of all requests to the WISMO Engine API. At no point does the application inspect or display the contents of the token.

## See Also

[Authentication Flow](authentication.md)

