angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope, global, $location){


	$scope.infoFlow = global;
	
	$scope.confirm = function(){
		$location.path("/payment");
	}

});
