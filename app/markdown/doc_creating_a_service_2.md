We use these two services to store and get the latest items in the browser. This will allow the application to instantly show the latest items when the application loads up. This introduces a complexity though. These local items might be out of sync with the server, so things might go wrong if the items are changed. There are many approaches to solving this and in this application we simply just do not allow any changes until the list is in sync with the server. Now the user gets a feeling of the application instantly loads and typically the list is synced before the user has any chance of making a change.

We have created an action that uses this service to do the actual storing and fetching from localStorage. Looking at the **storeItemsInLocalStorage** action we can see that it just grabs the current items and stores them. That means we can reuse this action in multiple chains.