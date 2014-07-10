'use strict';

angular.module('plupload.module', [])
	.directive('plUpload', [function () {
		return {
			restrict: 'A',
			scope: {
				'plProgressModel': '=',
				'plFilesModel': '=',
				'plFiltersModel': '=',
				'plMultiParamsModel':'=',
				'plInstance': '='
			},
			link: function (scope, iElement, iAttrs) {

				scope.randomString = function(len, charSet) {
				    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				    var randomString = '';
				    for (var i = 0; i < len; i++) {
				    	var randomPoz = Math.floor(Math.random() * charSet.length);
				    	randomString += charSet.substring(randomPoz,randomPoz+1);
				    }
				    return randomString;
				}

				if(!iAttrs.id){
					var randomValue = scope.randomString(5);
					iAttrs.$set('id',randomValue);	
				}
				if(!iAttrs.plAutoUpload){
					iAttrs.$set('plAutoUpload','true');
				}
				if(!iAttrs.plMaxFileSize){
					iAttrs.$set('plMaxFileSize','10mb');
				}
				if(!iAttrs.plUrl){
					iAttrs.$set('plUrl','upload.php');
				}
				if(!iAttrs.plFlashSwfUrl){
					iAttrs.$set('plFlashSwfUrl','lib/plupload/plupload.flash.swf');
				}
				if(!iAttrs.plSilverlightXapUrl){
					iAttrs.$set('plSilverlightXapUrl','lib/plupload/plupload.flash.silverlight.xap');
				 }
				if(typeof scope.plFiltersModel=="undefined"){
					scope.filters = [{title : "Image files", extensions : "jpg,jpeg,gif,png"}];
					//alert('sf');
				}
				else{
					scope.filters = scope.plFiltersModel;
				}



				var options = {
					runtimes : 'html5,flash,silverlight',
						browse_button : iAttrs.id,
						multi_selection: true,
				//		container : 'abc',
						max_file_size : iAttrs.plMaxFileSize,
						url : iAttrs.plUrl,
						flash_swf_url : iAttrs.plFlashSwfUrl,
						silverlight_xap_url : iAttrs.plSilverlightXapUrl,
						filters : scope.filters
				}


				if(scope.plMultiParamsModel){
					options.multipart_params = scope.plMultiParamsModel;
				}


					var uploader = new plupload.Uploader(options);

					uploader.init();

					uploader.bind('Error', function(up, err) {

						if(iAttrs.onFileError){
							scope.$parent.$apply(onFileError);
						}
			        	alert("Error: " + err.code + ", Message: " + err.message + (err.file ? ", File: " + err.file.name : "") + "");
			        	up.refresh(); // Reposition Flash/Silverlight
   				 	});

				uploader.bind('FilesAdded',function(up,files){
					
					//uploader.start();
					scope.$apply(function(){							

						if(iAttrs.plFilesModel){
							if(!angular.isArray(scope.plFilesModel))
								scope.plFilesModel = [];
							scope.plFilesModel.push(files[0]);
						}
						if(iAttrs.onFileAdded){
							scope.$parent.$eval(iAttrs.onFileAdded);
						}
					});
					if(iAttrs.plAutoUpload=="true"){
						uploader.start();
					}

    			});

    			uploader.bind('FileUploaded', function(up, file, res) {
					if(iAttrs.onFileUploaded){
							scope.$parent.$apply(iAttrs.onFileUploaded);
						}
				});

				uploader.bind('UploadProgress',function(up,file){

					if(!iAttrs.plProgressModel){
						return;
					}
					
					if(iAttrs.plFilesModel){
						scope.$apply(function(){
							scope.sum = 0;
							angular.forEach(scope.plFilesModel,function(file,key){
								scope.sum = scope.sum + file.percent;
							});
							scope.plProgressModel = scope.sum/scope.plFilesModel.length;
						});
					}
					else{
						scope.$apply(function(){
							scope.plProgressModel = file.percent;
						});
					}
					
					
					if(iAttrs.onFileProgress){
						scope.$parent.$eval(iAttrs.onFileProgress);
					}
    				

    			});

				if(iAttrs.plInstance){
					scope.plInstance = uploader;	
				}
    			

    			// scope.upload = function(){
    			// 	uploader.start();
    			// };
				
			}
		};
	}])