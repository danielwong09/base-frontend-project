
var BlocChat = angular.module('BlocChat', ['ui.router', 'firebase', 'ui.bootstrap']);

BlocChat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });

}]);

BlocChat.controller('Home.controller', ['$scope', 'Room', '$modal', function($scope, Room, $modal) {
  $scope.rooms = Room.all;
  $scope.openNewRoomModal = function(e){

    var modalInstance = $modal.open({
      templateUrl: '/templates/newRoomModal.html',
      controller: 'newRoomModal.controller',
      resolve: {
        rooms: function () {
          return $scope.rooms;
        }
      }
    });

    modalInstance.result.then(function (newRoomName) {
      Room.add({name: newRoomName});
    });

  };


}]);

BlocChat.factory('Room', ['$firebaseArray', function($firebaseArray) {
	
  var firebaseRef = new Firebase("https://mybloc-chat.firebaseio.com/");

  var rooms = $firebaseArray(firebaseRef.child('rooms'))

  return {
    all: rooms,
    add: function(newRoom) {
      if(newRoom){
       rooms.$add({ name: newRoom.name});
      } else{
        console.log("newRoom is invalid");
      }
      
     },
  }

}]);

BlocChat.controller('newRoomModal.controller', [ '$scope', '$modalInstance', function ($scope, $modalInstance) {

  $scope.addRoom = function () {

    //room name error checking 
    //can't be repeat, do this later

    //can't be blank
    if($scope.newRoomName){
      $modalInstance.close($scope.newRoomName);
    } else{
      console.log("newRoomName is not truthy");
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);