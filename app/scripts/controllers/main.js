'use strict';

angular.module('angularAnimationTestApp')
  .controller('MainCtrl', function ($scope, items) {
    $scope.items = items;
    $scope.username = 'Guest' + Math.floor(Math.random()*101);

    $scope.addItem = function () {
        $scope.items.$add({
          from: $scope.username,
          content: $scope.item
        });
        $scope.item = '';
      };
  });
