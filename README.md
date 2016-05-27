# .gitignore-semester6

# Austrian Airlines
A mock web app for Austrian Airlines, supporting reserving fake flights online.

### How to run the web app:
1. Clone the repo
2. Run `npm install`
3. Create a MongoDB with name `austrian`
4. Create a `.env` file containing the following values:
  * `PORT`, the port number to run the project on
  * `mongoUrl`, the connection url to MongoDB
  * `SECRET_KEY`, the JWT secret key, get it from the sprint description.
  * `STRIPE_KEY`, Stripe secret key, put your own to test the functionaly.
  * `DEV`, a boolean variable to enable some debugging utilities if you are in development mode. Put `1` to enable it.
5. Run `server.js` file.

### How to run the Ionic app:
1. Use the app_id in Ionic view: `76069f6d`
2. Or install Ionic and Cordova on your machine, pull the project, navigate into `austrian-mobile`, and run `ionic serve`

### Notes on Ionic:
- There is a bug on android devices, the `select` input disappears instantly once opened, you need to keep holding for less than half a second to keep it open.
- We found that this is a common issue in ionic with android, and several issues are submitted on Ionic github page, here is one of them https://github.com/driftyco/ionic/issues/836
- The `select` input works perfectly on iOS.

### Disclaimer:
- This app is made only for academic purposes. It is not related by any means to Austrian Airlines company.
- For the payment, all payments are done in test mode, so no real cards are charged.
- Any copyright material used where only to mock the experience, and are not meant to interpersonate Austrian Airlines company.


