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
    'hljs'
  ])
  .config(function ($routeProvider) {
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });
