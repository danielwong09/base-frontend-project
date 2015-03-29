
var BlocChat = angular.module('BlocChat', ['ui.router']);

BlocChat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });

}]);

BlocChat.controller('Home.controller', ['$scope', function($scope) {
  console.log("home.controller is connected");
}]);
