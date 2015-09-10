myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {templateUrl : 'tpls/home.html', controller : 'mainCtrl'})
				  .when('/add/:id', {templateUrl : 'tpls/game-details.html', controller : 'addGameCtrl'})
				  .when('/edit/:id', {templateUrl : 'tpls/game-details.html', controller : 'editGameCtrl'})
				  .otherwise({redirectTo : '/'});
} ]);

