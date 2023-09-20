// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://localhost:3000/api/v1',
  USER_ID: 'auth_user_id',
  A_TOKEN: 'a_token',
  LOCALES: ['en', 'by', 'pl', 'ru'],
  FACEBOOK_LOGIN_LINK: 'http://localhost:3000/api/v1/auth/facebook',
  FACEBOOK_APP_CALLBACK_URL:
    'http://localhost:3000/api/v1/auth/facebook/callback',
  GOOGLE_LOGIN_LINK: 'http://localhost:3000/api/v1/auth/google',
  GOOGLE_APP_CALLBACK_URL: 'http://localhost:3000/api/v1/auth/google/callback',
  WEBSOCKET_URL: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

  // API: 'https://itr-c-f-p-b.onrender.com/api/v1',
