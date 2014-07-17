'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','plupload.directive','ui.bootstrap']).
  config(['$routeProvider', 'plUploadServiceProvider', function($routeProvider, plUploadServiceProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: MyCtrl1});
    $routeProvider.otherwise({redirectTo: '/home'});

    plUploadServiceProvider.setConfig('flashPath', '/dist/plupload.flash.swf');
    plUploadServiceProvider.setConfig('silverLightPath', '/dist/plupload.silverlight.xap');
    plUploadServiceProvider.setConfig('headers', {'X-abc': 5});

  }]).run(['plUploadService', function(plUploadService){


  }]);