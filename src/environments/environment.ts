// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v1.0.0',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'api',
  appThemeName: 'Metronic',
  remoteEgoServiceBaseUrl: 'https://dms.thakhutse.co.za/ego-api',
  remoteSongServiceBaseUrl: 'https://dms.thakhutse.co.za/song-api',
  // remoteStudyServiceBaseUrl: 'https://dms.thakhutse.co.za/ego-api/',
  remoteMaestroServiceBaseUrl: 'https://dms.thakhutse.co.za/ego-api/',
  // appPurchaseUrl: '#',
  // appHTMLIntegration: '#',
  // appPreviewUrl: '#',
  // appPreviewAngularUrl: '#',
  // appPreviewDocsUrl: '#',
  // appPreviewChangelogUrl: '#',
  appDemos: {
    'overture-client': {
      'title': 'Overture DMS',
      'description': 'Default Dashboard',
      'published': true,
      'thumbnail': './assets/media/demos/overture-client.png'
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
