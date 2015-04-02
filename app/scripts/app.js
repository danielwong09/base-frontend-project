
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
  };
}]);

// 'app' refers to a variable referencing your app's module definition
BlocChat.factory('Room', ['$firebaseArray', function($firebaseArray) {

	console.log("Room");
	//https://mybloc-chat.firebaseio.com/#-JlNe2utRXaWYNZWTdU0|deedfda97257dab768c3547ecaada92f
  var firebaseRef = new Firebase("https://mybloc-chat.firebaseio.com/");
  var rooms = $firebaseArray(firebaseRef.child('rooms'));
  rooms.$add({name:'daniel'});

  return {
    all: rooms,
    add: function(newRoom) {
       // Checks to make sure that a sound file is playing before seeking.
       rooms.$add({ name: newRoom.name});
     },
  }

}])