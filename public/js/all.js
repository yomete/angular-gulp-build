var app = angular.module('app', [ 'ngStorage', 'restangular'])

app.controller('MainController', function($scope) {
	$scope.message = 'Hello World!'

})