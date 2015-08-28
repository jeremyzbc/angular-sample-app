var myControllers = angular.module('myControllers',['myServices','myFilters']);

myControllers.controller('mainCtrl',mainCtrl);
mainCtrl.$inject = ['$scope', '$filter','Services'];
function mainCtrl($scope,$filter,Services){
	Services.getGames();
	$scope.$on('dataReady',function(){
		//get all game type
		var gameTypes = function(){
			var temp = new Array();
			for (var i = $scope.games.length - 1; i >= 0; i--) {

				if(!$filter('isInArray')($scope.games[i].type, temp) ){
					temp.push($scope.games[i].type);
				}
			};
			return temp;
		}

		$scope.gameTypes = gameTypes();

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
}


myControllers.controller('addGameCtrl',addGameCtrl);
addGameCtrl.$inject = ['$scope'];
function addGameCtrl($scope){

}

