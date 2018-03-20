# Firebase Cloud Storage Gallery Demo

This application demonstrates the use Firebase Storage, and Firebase Realtime Database to create a simple gallery picture taking app.

## Install UI
Assuming you have [NodeJS](https://nodejs.org/en/) installed, run the command in the `gallery` folder

```
npm install
```
This app is written in Ionic, so you will need to install the [Ionic CLI](https://ionicframework.com/getting-started)
```
npm install -g ionic
```



## Getting Started
1. Create a Firebase app from the [Firebase Console](console.firebase.google.com)

2. You will need to modify the `app.module.ts` to change the firebase configuration from your firebase console. Take a look at the [setup guide](https://firebase.google.com/docs/web/setup)
```
export const firebaseConfig = {
  apiKey: "xxxxxxxxxx",
  authDomain: "your-domain-name.firebaseapp.com",
  databaseURL: "https://your-domain-name.firebaseio.com",
  storageBucket: "your-domain-name.appspot.com",
  messagingSenderId: '<your-messaging-sender-id>'
};
```
3. Start the application by running
```
ionic serve
```
4. Since this demo app doesnt handle authentication, we will need to disable authentication from the Firebase console. After selecting Database, select the Rules tab, and modify the rules. Do the same for storage as well.
```
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth == null"
  }
}
```
**Note! this is not recommended to leave the rules unsecured. Please restore the rules after you have done testing.**



## Deploy
1. Modify the `.firebaserc` file and replace it with your Firebase project id.

3. In the `gallery` folder, run the command below. This will deploy the app on Firebase Hosting
```
npm run build -- --prod
```
Then run
```
firebase deploy
```
