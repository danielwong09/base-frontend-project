
var BlocChat = angular.module('BlocChat', ['ui.router', 'firebase']);

BlocChat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });

}]);

BlocChat.controller('Home.controller', ['$scope', 'Room', function($scope, Room) {
  $scope.rooms = Room.all;
  $scope.addRoom = function(e){
  	Room.add({name: $scope.roomName});
  	//clear form
  	$scope.roomName = "";
  };
}]);

BlocChat.factory('Room', ['$firebaseArray', function($firebaseArray) {
	
  var firebaseRef = new Firebase("https://mybloc-chat.firebaseio.com/");

  var rooms = $firebaseArray(firebaseRef.child('rooms'))

  return {
    all: rooms,
    add: function(newRoom) {

       rooms.$add({ name: newRoom.name});
      
     },
  }

}]);