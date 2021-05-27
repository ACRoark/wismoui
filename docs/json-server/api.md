# Replacing API Calls

## findOrder URL

Within app/store/defaults/initialConfigState.js, within the urls object, replace the findOrder URL to `'http://localhost:3001/{orderNumber}?q={name}'`

We can now make a query to the json-server, using an existing mock orderNumber and name from the browser. 

> Example: MI123456789 with the name 'Frodo Baggins'


## searchOrders URL

Within app/store/defaults/initialConfigState.js, within the urls object, replace the searchOrders URL to `'http://localhost:3001/AuthorizedMockData'`

Now, whenever you login using a valid login, the orders that will be displayed will be the mock orders you created under the authorizedMockDataFileName that you chose. See [Creating Mock Data - Authorized User Flow](data.md)

## getOrder URL

Within app/store/defaults/initialConfigState.js, within the urls object, replace the getOrder URL to `'http://localhost:3001/{orderNumber}`
