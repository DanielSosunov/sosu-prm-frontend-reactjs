# Add Interaction Webview Documentation

### 2 Locations this webview will open in

1. When the user clicks `Add Interaction` away from the Contact Webview.
2. When the user clicks `Add interaction` from a Contact Webview.

### What the webview looks for and how it works

When the webview loads, it looks for the following query parameters in the url:

1. `contactId` - This is required, and logic is based off this field.
2. `contactName` - If this doesnt exist its defauled to `No Name`
3. `contactPhone` - If this doesnt exist its defaulted to `No Phone`

If the `contactId` doesnt exist, it will send a command back to the React Native app `open:contacts`
If the `contactId` does exist, it will allow the user to fill in the proper options and pass the data along to the API.
If the `Change Contact` button is clicked it will pass the `open:contacts` command to the React Native app

### What the Native app does when it receives the `open:contacts` command

When the webview passes the command `open:contacts` to the Native app:

1. It will open the contacts menu
2. Allow the user to select a contact
3. Capture the `contactId`, `contactName`, and `contactPhone`
4. Generate the Webview url `{URL}?contactId={}&contactName={}&contactPhone={}`
5. Open the webview
