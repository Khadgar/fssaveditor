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

// create the controller and inject Angular's $scope
app.controller('bodyController',['$scope', function($scope) {
	// create a message to display in our view
	$scope.message = 'Fallout Shelter SAV editor';
}]);

app.controller('contentController',['$scope', function($scope) {
	// create a message to display in our view
	$scope.message = 'Fallout Shelter SAV editor';
	//console.log($scope.data)
}]);
