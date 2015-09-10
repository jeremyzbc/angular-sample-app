var myServices = angular.module('myServices',[]);
myServices.factory('Services',['$http','$filter', '$rootScope', function($http, $filter, $rootScope){

	return {
		getGamesTypes : function(){

			var temp = new Array();
			for (var i = $rootScope.games.length - 1; i >= 0; i--) {

				if(!$filter('isInArray')($rootScope.games[i].type, temp) ){
					temp.push($rootScope.games[i].type);
				}
			};
			return temp;
		},
    setNextGameId : function(){

      $rootScope.nextGameID = $rootScope.games[$rootScope.games.length-1].id + 1;
    },
    verifyTypeName : function(typeName){
      for (var i = $rootScope.gameTypes.length - 1; i >= 0; i--) {
        if( $rootScope.gameTypes[i].toLowerCase() == typeName.toLowerCase() ){
          return $rootScope.gameTypes[i];
        }
      };
      return false;
    },
    addGameType : function(typeName){
      $rootScope.gameTypes.push(typeName);
    },
    removeGameType : function(typeName){
      var index = $rootScope.gameTypes.indexOf(typeName);
      if (index > -1) {
          $rootScope.gameTypes.splice(index, 1);
      }
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
      ++$rootScope.nextGameID;
      $rootScope.games.push(newGame);
			$rootScope.$broadcast('addNewGameFinished');

		},
    removeGame : function(id){
      for (var i = $rootScope.games.length - 1; i >= 0; i--) {

        if( $rootScope.games[i].id == id){
          //remove the game
          $rootScope.games.splice(i, 1);
        }
      }
      return $rootScope.games;
    },
    updateGame : function(id, name, price, year, gameType, multiPlayer){
      var game = {
        "id" : id,
        "name": name,
        "type":gameType,
        "year":year,
        "multiplayer":multiPlayer,
        "price":price
      };
      for (var i = $rootScope.games.length - 1; i >= 0; i--) {
        if( $rootScope.games[i].id == id ){
          $rootScope.games[i] = game;
        }
      };
      $rootScope.$broadcast('updateGameFinished');
    }
	}


}]);