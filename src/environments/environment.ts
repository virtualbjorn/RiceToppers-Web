// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  reusablePaths: {
    SAMPLE_PATH_NAME: 'sample'
    // PATH_NAME: '<path name in route>' // Reusable paths are paths that store their state
  },
  firebase: {
    apiKey: "AIzaSyD2znyV0Z9K-2KryxPMLLEbn8menRLBmRQ",
    authDomain: "vbjorn-ricetoppers.firebaseapp.com",
    databaseURL: "https://vbjorn-ricetoppers.firebaseio.com",
    projectId: "vbjorn-ricetoppers",
    storageBucket: "vbjorn-ricetoppers.appspot.com",
    messagingSenderId: "599901132966"
  }
};
