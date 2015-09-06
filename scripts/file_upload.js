//inject angular file upload directives and services.
var app = angular.module('mainApp', ['ngFileUpload','ngRoute']);

app.service('VaultData', function() {
  var vault ='';

  var setVault = function(newObj) {
      vault = newObj;
  };

  var getVault = function(){
      return vault;
  };

  return {
    setVault: setVault,
    getVault: getVault
  };

});

app.controller('uploadController', ['$scope', 'Upload', '$timeout','$location','VaultData', function ($scope, Upload, $timeout, $location, VaultData) {
			$scope.$watch('files', function () {
				$scope.upload($scope.files);
			});
			$scope.$watch('file', function () {
				if ($scope.file != null) {
					$scope.upload([$scope.file]);
				}
			});
			$scope.log = '';

			$scope.upload = function (files) {
				if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						if (!file.$error) {
							Upload.upload({
								url : '/upload',
								file : file
							}).progress(function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								$scope.log = 'progress: ' + progressPercentage + '% ' +
									evt.config.file.name + '\n' + $scope.log;
							}).success(function (data, status, headers, config) {
								$timeout(function () {
									$scope.log = 'file: ' + config.file.name + ', Response: ' + data + '\n' + $scope.log;
									//Share data between controllers
									VaultData.setVault(data);
									$location.path('/content')
								});
							});
						}
					}
				}
				
			};
		}
	]);