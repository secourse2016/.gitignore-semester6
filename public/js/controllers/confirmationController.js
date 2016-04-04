angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope, global, $location){
	
	$scope.infoFlow = global;
	$scope.step = 3; // View number in the stepper
	$scope.confirm = function(){
		$location.path("/payment");
	}

});
