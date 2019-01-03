import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
// import * as Sample from './sample';
import * as GetAppReport from './facebook-api/get-app-report';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

// export const sample = Sample.listener;
export const getAppReport = GetAppReport.listener;