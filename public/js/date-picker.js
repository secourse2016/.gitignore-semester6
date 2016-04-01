
$(document).ready(function(){

	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  });

	console.log("3ww");
	$('#button').on('click' , function(){
		console.log("3w");
		$('#form').hide();
	});
});
          