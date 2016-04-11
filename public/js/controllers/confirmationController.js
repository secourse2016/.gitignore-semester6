angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope, global, $location){


	$scope.infoFlow = global;
	$scope.step = 3; // View number in the stepperr
	$scope.confirm = function(){
		$location.path("/payment");
	}

});
