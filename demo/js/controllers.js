'use strict';

/* Controllers */

function multiLineHtmlEncode(value) {
    var lines = value.split(/\r\n|\r|\n/);
    for (var i = 0; i < lines.length; i++) {
        lines[i] = htmlEncode(lines[i]);
    }
    return lines.join('\r\n');
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function MyCtrl1($scope) {

	$('pre.prettyprint').each(function(){
		if(!$(this).find('textarea').length)
			return;

		$(this).html(multiLineHtmlEncode($(this).find('textarea').val()));

	});

	prettyPrint();

	//$scope.percent = '';
	$scope.files = [];
	$scope.multiFiles = [];
	$scope.filters = [{title : "Image files", extensions : "jpg,jpeg,gif,png"}];
	$scope.multiParams = {'path':'C:/Users/vaio/'};
	//$scope.uploader = {};


	$scope.$watch('uploader', function(x){
		if(x)
			console.log(x);
	});

	$scope.upload = function(){
		//console.log($scope.uploader);
		alert('sdf');
		//$scope.uploader.start();
	};

}
MyCtrl1.$inject = ['$scope'];

