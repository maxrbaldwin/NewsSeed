angular.module('controllers', [])

.controller('SeedCtrl', function($scope, $localstorage, $stateParams, $ionicPopup) {
  $scope.secret = null;
  $scope.saveToStorange = function (secretMessage) {
    $scope.secret = secretMessage;
    $localstorage.setObject('secret',{
      secret: secretMessage
    })
  }
  $scope.pingConsole = function () {
    console.log('hey');
  }
})

.controller('StoryCtrl', function($scope, $localstorage) {

});