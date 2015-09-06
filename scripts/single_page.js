app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // route for the upload page
            .when('/', {
                templateUrl : './views/upload.html',
                controller  : 'bodyController'
            })

            // route for the content page
            .when('/content', {
                templateUrl : './views/content.html',
                controller  : 'contentController'
            })
		$locationProvider.html5Mode(true);
    });

app.controller('bodyController',['$scope', function($scope) {
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope','VaultData', function($scope,VaultData) {
	$scope.message = JSON.stringify(VaultData.getVault());
	console.log('/content opened')
}]);
