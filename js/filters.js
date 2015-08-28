var myFilters = angular.module('myFilters',[]);
myFilters.filter('isInArray',function(){
	return function(value,array){

		return !(array.indexOf(value) == -1);
	}
});

myFilters.filter('yesNo',function(){
	return function(value){

		return (value)? 'Yes' : 'No';
	}
});

