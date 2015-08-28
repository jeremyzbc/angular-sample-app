var myServices = angular.module('myServices',[]);
myServices.factory('Services',['$http','$rootScope', function($http, $rootScope){

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
		startFilter : function(gameType){
			this.typeForFilter = gameType;
			$rootScope.$broadcast('startFilter');
		},
		stopFilter : function(){
			$rootScope.$broadcast('stopFilter');
		}
	}


}]);