var myServices = angular.module('myServices',[]);
myServices.factory('Services',['$http','$filter', '$rootScope', function($http, $filter, $rootScope){

	return {
		getGames : function(){
			$http({
				method : 'GET',
				url : 'data/data.json'
			}).then(function(res){
				$rootScope.games = res.data;
				$rootScope.$broadcast('dataReady');
			},function(){
				console.log('There is an error.');
			});
		},
		getGamesTypes : function(){
			var temp = new Array();
			for (var i = $rootScope.games.length - 1; i >= 0; i--) {

				if(!$filter('isInArray')($rootScope.games[i].type, temp) ){
					temp.push($rootScope.games[i].type);
				}
			};
			return temp;
		},
		startFilter : function(gameType){
			this.typeForFilter = gameType;
			$rootScope.$broadcast('startFilter');
		},
		stopFilter : function(){
			$rootScope.$broadcast('stopFilter');
		},
		addNewGame : function(id, name, price, year, gameType, multiPlayer){

			var newGame = {
							"id" : id,
							"name": name,
							"type":gameType,
							"year":year,
							"multiplayer":multiPlayer,
							"price":price
						};

			$rootScope.$broadcast('addNewGameFinished',newGame);

		}
	}


}]);