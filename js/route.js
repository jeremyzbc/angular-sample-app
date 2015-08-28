myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {templateUrl : 'tpls/home.html', controller : 'mainCtrl'})
				  .when('/add', {templateUrl : 'tpls/add-game.html', controller : 'addGameCtrl'})
				  .otherwise({redirectTo : '/'});
} ]);

