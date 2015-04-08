
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

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

BlocChat.controller('newRoomModal.controller', [ '$scope', '$modalInstance', function ($scope, $modalInstance) {


  $scope.addRoom = function () {
    $modalInstance.close($scope.newRoomName);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);