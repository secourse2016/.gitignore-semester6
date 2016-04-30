var app = angular.module('starter');

app.controller('collapsableController' , function($scope) {


    $scope.openFirstAccordion = function() {
      $scope.shownGroup = 0;
    };
    /**
     * function to toggle the active group to not active and vice versa.
     **/
    $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
   /**
    * function to check if the collapsable group is active or not.
    **/
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
});
