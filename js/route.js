myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {templateUrl : 'tpls/home.html', controller : 'mainCtrl'})
				  .when('/add/:id', {templateUrl : 'tpls/add-game.html', controller : 'addGameCtrl'})
				  .when('/edit/:id', {templateUrl : 'tpls/edit-game.html', controller : 'editGameCtrl'})
				  .otherwise({redirectTo : '/'});
} ]);

