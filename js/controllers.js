//fetch data and set $rootScope on application first load
myApp.run(['$http', '$filter', '$rootScope', function($http, $filter, $rootScope){
    $http({
      method : 'GET',
      url : 'data/data.json'
    }).then(function(res){
      $rootScope.games = res.data;
          //get all game type
      $rootScope.gameTypes = [];
      for (var i = $rootScope.games.length - 1; i >= 0; i--) {

        if(!$filter('isInArray')($rootScope.games[i].type, $rootScope.gameTypes) ){
          $rootScope.gameTypes.push($rootScope.games[i].type);
        }
      };
    },function(){
      console.log('There is an error.');
    });

}]);

var myControllers = angular.module('myControllers',['myServices','myFilters','myDirectives']);

myControllers.controller('mainCtrl',mainCtrl);
mainCtrl.$inject = ['$scope', '$filter','Services'];
function mainCtrl($scope,$filter,Services){


	//get all games and sorting
  var allGames = $scope.games;
  Services.setNextGameId();
  $scope.orderBy = 'price';
  $scope.reverse = false;
  $scope.games = $filter('orderBy')(allGames, $scope.orderBy, $scope.reverse);

  $scope.sortBy = function(attr){
    if($scope.orderBy == attr){
      $scope.reverse = !$scope.reverse;
    }
    else{
      $scope.orderBy = attr;
    }

    $scope.games = $filter('orderBy')($scope.games, $scope.orderBy, $scope.reverse);

  }

	$scope.startFilter = function(gameType){

		 allGames = allGames ? allGames : $scope.games;
    $scope.games = $filter('filter')(allGames, {'type' : gameType});
	}
	$scope.stopFilter = function(){

		allGames = allGames ? allGames : $scope.games;
    $scope.games = allGames;
	}

	$scope.deleteGame = function(id){
		var ans = confirm("Are you really want to delete the game?");
		if(ans){

      $scope.games = Services.removeGame(id);
      //update game types
      $scope.gameTypes = Services.getGamesTypes();
		}
	}

}


myControllers.controller('addGameCtrl',addGameCtrl);
addGameCtrl.$inject = ['$route','$scope','$location','$timeout','Services'];
function addGameCtrl($route, $scope,$location, $timeout, Services){
	$scope.success = false;
  $scope.isAppendHiddenField = false;
  $scope.showMessage = [];
	//add another option "Other"
  Services.addGameType('Other');

	var id = parseInt($route.current.params.id);
  $scope.ctrlAction = function(){
     this.showErrorMessages();
     if($scope.gamedetailform.$valid){
      this.addNewGame();
     }

  }

  $scope.showErrorMessages = function(){
    for (var i = $scope.showMessage.length - 1; i >= 0; i--) {
        $scope.showMessage[i] = true;
      };
  }

	$scope.addNewGame = function(){
    // console.log($scope.games);
    if($scope.gameType == 'Other'){

      //if user select 'Other' but enter game type that is in the game type list
      var temp = Services.verifyTypeName($scope.gameTypeName);
      if(temp !== false ){
        //then get the name
        $scope.gameTypeName = temp;
      }
      else{
        //otherwise add a new type
        Services.addGameType($scope.gameTypeName);
      }

      //add the game
      Services.addNewGame(id, $scope.name,$scope.price,$scope.year,$scope.gameTypeName,$scope.multiPlayer);

    }
    else{
      Services.addNewGame(id, $scope.name,$scope.price,$scope.year,$scope.gameType,$scope.multiPlayer);
    }

	}

	$scope.$on('addNewGameFinished',function(){
		$scope.success = true;

		$timeout(redirectToHome, 2000);
	});

  $scope.change = function(){
    if($scope.gameType == 'Other'){
          $scope.isAppendHiddenField = true;

      }
      else{
          $scope.isAppendHiddenField = false;
      }
  }

  function redirectToHome(){
    //remove 'Other' type from array, as in home page, does not have 'Other' game type
      Services.removeGameType('Other');
      $location.path('/');
  }
}

myControllers.controller('editGameCtrl',editGameCtrl);
editGameCtrl.$inject = ['$route','$scope','$location','$timeout','Services'];
function editGameCtrl($route, $scope, $location, $timeout, Services){
  $scope.success = false;
  $scope.isAppendHiddenField = false;
  $scope.showMessage = [];
  //add another option "Other"
  Services.addGameType('Other');

  var id = parseInt($route.current.params.id);
      $scope.multiPlayer = ($route.current.params.multiplayer==='true')? true: false;
      $scope.name = $route.current.params.name;
      $scope.gameType = $route.current.params.type;
      $scope.price = $route.current.params.price;
      $scope.year = $route.current.params.year;

  $scope.ctrlAction = function(){
     this.showErrorMessages();
     if($scope.gamedetailform.$valid){
        this.editGame();
     }

  }

  $scope.showErrorMessages = function(){
    for (var i = $scope.showMessage.length - 1; i >= 0; i--) {
        $scope.showMessage[i] = true;
      };
  }

  $scope.editGame = function(){
    if($scope.gameType == 'Other'){

      //if user select 'Other' but enter game type that is in the game type list
      var temp = Services.verifyTypeName($scope.gameTypeName);
      if(temp !== false ){
        //then get the name
        $scope.gameTypeName = temp;
      }
      else{
        //otherwise add a new type
        Services.addGameType($scope.gameTypeName);
      }
      //update the game
      Services.updateGame(id, $scope.name,$scope.price,$scope.year,$scope.gameTypeName,$scope.multiPlayer);

    }
    else{
      Services.updateGame(id, $scope.name,$scope.price,$scope.year,$scope.gameType,$scope.multiPlayer);
    }
  }

  $scope.$on('updateGameFinished',function(){
    $scope.success = true;
    $timeout(redirectToHome, 2000);
  });

  $scope.change = function(){
    if($scope.gameType == 'Other'){
          $scope.isAppendHiddenField = true;

      }
      else{
          $scope.isAppendHiddenField = false;
      }
  }

  function redirectToHome(){
    //remove 'Other' type from array, as in home page, does not have 'Other' game type
      Services.removeGameType('Other');
      $location.path('/');
  }
}

