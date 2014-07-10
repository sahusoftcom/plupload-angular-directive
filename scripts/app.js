'use strict';

/**
 * @ngdoc overview
 * @name pluploadAngularDirectiveApp
 * @description
 * # pluploadAngularDirectiveApp
 *
 * Main module of the application.
 */
angular
  .module('pluploadAngularDirectiveApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'hljs',
    'plupload.directive'
  ])
  .config(function ($routeProvider, plUploadServiceProvider) {

    plUploadServiceProvider.setConfig('uploadPath', 'upload-controller');

  });