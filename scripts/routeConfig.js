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