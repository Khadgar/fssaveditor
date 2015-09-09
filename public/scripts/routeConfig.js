app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// route for the upload page
		.when('/', {
			templateUrl : './upload.html',
			controller  : 'bodyController'
		})

		// route for the content page
		.when('/content', {
			templateUrl : './content.html',
			controller  : 'contentController'
		})
		.otherwise({
		redirect: '/'
		});
	$locationProvider.html5Mode(true);
});