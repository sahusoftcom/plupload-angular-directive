'use strict';

/**
 * @ngdoc function
 * @name pluploadAngularDirectiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pluploadAngularDirectiveApp
 */
angular.module('pluploadAngularDirectiveApp')
  .controller('MainCtrl', function ($scope) {

  	//$scope.percent = '';
	$scope.files = [];
	$scope.multiFiles = [];
	$scope.filters = [{title : "Image files", extensions : "jpg,jpeg,gif,png"}];
	$scope.multiParams = {'path':'C:/Users/vaio/'};
	//$scope.uploader = {};
	$scope.upload = function(){
		//console.log($scope.uploader);
		alert('Uploaded');
		//$scope.uploader.start();
	};


  });
