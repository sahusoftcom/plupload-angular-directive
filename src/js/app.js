'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','plupload.module','ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: MyCtrl1});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);


