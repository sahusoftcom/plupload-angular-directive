'use strict';

angular.module('plupload.directive', [])
	.provider('plUploadService', function() {

		var config = {
			flashPath: 'bower_components/plupload-angular-directive/dist/plupload.flash.swf',
			silverLightPath: 'bower_components/plupload-angular-directive/dist/plupload.silverlight.xap',
			uploadPath: 'upload.php'
		};

		this.setConfig = function(key, val) {
	        	config[key] = val;
	        };

	    this.getConfig =  function(key) {
	        	return config[key];
	        };

	    var that = this;

	    this.$get = [function(){

		    return {
		        getConfig: that.getConfig,
		        setConfig: that.setConfig
		    };

		}];

	})	
	.directive('plUpload', ['$parse', '$log', 'plUploadService', function ($parse, $log, plUploadService) {
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
					iAttrs.$set('plUrl', plUploadService.getConfig('uploadPath'));
				}
				if(!iAttrs.plFlashSwfUrl){
					iAttrs.$set('plFlashSwfUrl', plUploadService.getConfig('flashPath'));
				}
				if(!iAttrs.plSilverlightXapUrl){
					iAttrs.$set('plSilverlightXapUrl', plUploadService.getConfig('silverLightPath'));
				}
				if(typeof scope.plFiltersModel=="undefined"){
					scope.filters = [{title : "Image files", extensions : "jpg,jpeg,gif,png,tiff,pdf"}];
					//alert('sf');
				} else{
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
						filters : scope.filters,
						drop_element: iAttrs.plDropElement
				}


				if(scope.plMultiParamsModel){
					options.multipart_params = scope.plMultiParamsModel;
				}


				var uploader = new plupload.Uploader(options);

				uploader.settings.headers = plUploadService.getConfig('headers');

				uploader.init();

				uploader.bind('Error', function(up, err) {
					if(iAttrs.onFileError){
						scope.$parent.$apply(iAttrs.onFileError);
					} 
					
					$log.error("Cannot upload, error: " + err.message + (err.file ? ", File: " + err.file.name : "") + "");

					up.refresh(); // Reposition Flash/Silverlight
 				});

				uploader.bind('FilesAdded', function(up,files) {
					//uploader.start();
					scope.$apply(function() {
						if(iAttrs.plFilesModel) {
							angular.forEach(files, function(file,key) {
								if (!scope.plFilesModel) scope.plFilesModel=[];
								scope.plFilesModel.push(file);
							});
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
					    //We are going to make some refactor here.
			                    //The idea behind is always update files with the server response value
			                    //And also launch the eventi if neeed
			
			                    //If we have the model...
			                    if(iAttrs.plFilesModel) {
			                        //Apply on scope...
			                        scope.$apply(function() {
			
			                            //All files are uploaded?
			                            scope.allUploaded = false;
			
			                            angular.forEach(scope.plFilesModel, function($file, key) {
			
			                                //Bug FIX, this logic will set allUploaded right
			                                if(file.percent != 100) {
			                                    scope.allUploaded = false;
			                                } else if(file.id == $file.id) { //If the file is the same that we are reciving...
			                                    //Set response on the file
			                                    $file.response = JSON.parse(res.response);
			
			                                    //Need throw event? throw it
			                                    if(iAttrs.onFileUploaded) {
			                                        var fn = $parse(iAttrs.onFileUploaded);
			                                        fn(scope.$parent, {$response:res});
			                                    }
			                                }
			
			                            });
			                        });
			                    }
			                    //We doesn't have model but we have the event
			                    else if(!iAttrs.plFilesModel && iAttrs.onFileUploaded) {
			                        var fn = $parse(iAttrs.onFileUploaded);
			                        scope.$apply(function(){
			                            fn(scope.$parent, {$response:res});
			                        });
			                    }
				});

				uploader.bind('UploadProgress',function(up,file){
					if(!iAttrs.plProgressModel){
						return;
					}
					
					if(iAttrs.plFilesModel){
						scope.$apply(function() {
							scope.sum = 0;

							angular.forEach(scope.plFilesModel, function(file,key) {
								scope.sum = scope.sum + file.percent;
							});

							scope.plProgressModel = scope.sum/scope.plFilesModel.length;
						});
					} else {
						scope.$apply(function() {
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

				scope.$on("$destroy", function(){
                    			uploader.destroy();
                		});
                
			}
		};
	}])
