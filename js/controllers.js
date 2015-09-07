var myControllers = angular.module('myControllers',['myServices','myFilters','myDirectives']);

myControllers.controller('mainCtrl',mainCtrl);
mainCtrl.$inject = ['$scope', '$filter','Services'];
function mainCtrl($scope,$filter,Services){
	if(typeof $scope.games === 'undefined'){
		Services.getGames();
	};

	$scope.$on('dataReady',function(){
		//get all game type

		$scope.gameTypes = Services.getGamesTypes();

		//get all games and sorting

		var allGames = $scope.games;
		$scope.orderBy = 'price';
		$scope.reverse = false;
		$scope.games = $filter('orderBy')(allGames, $scope.orderBy, $scope.reverse);

		$scope.$on('startFilter', function(){
			var typeForFilter = Services.typeForFilter;
			$scope.games = $filter('filter')(allGames, {'type' : typeForFilter});
		});

		$scope.$on('stopFilter', function(){
			$scope.games = allGames;
		});

		$scope.sortBy = function(attr){
			if($scope.orderBy == attr){
				$scope.reverse = !$scope.reverse;
			}
			else{
				$scope.orderBy = attr;
			}

			$scope.games = $filter('orderBy')($scope.games, $scope.orderBy, $scope.reverse);
		}
	})

	$scope.setType = function(gameType){

		Services.startFilter(gameType);
	}
	$scope.unsetType = function(){

		Services.stopFilter();
	}

	$scope.deleteGame = function(id){
		var ans = confirm("Are you really want to delete the game?");
		if(ans){
			for (var i = $scope.games.length - 1; i >= 0; i--) {

				if( $scope.games[i].id == id){
					$scope.games.splice(i, 1);
				}
			}
		}
	}
}


myControllers.controller('addGameCtrl',addGameCtrl);
addGameCtrl.$inject = ['$route','$scope','$location','$timeout','Services'];
function addGameCtrl($route, $scope, $location, $timeout, Services){
	$scope.success = false;
	$scope.gameTypes = Services.getGamesTypes();
	//add another option "Other"
	$scope.gameTypes.push('Other');

	var id = parseInt($route.current.params.id);
	$scope.addNewGame = function(){

		Services.addNewGame(id, $scope.name,$scope.price,$scope.year,$scope.gameType,$scope.multiPlayer);
	}

	$scope.$on('addNewGameFinished',function(event,newGame){

		$scope.success = true;
		$scope.games.push(newGame);

		$timeout(function(){$location.path('/');}, 3000);
	})

}

