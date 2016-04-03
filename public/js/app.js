var app = angular.module('austrianAirlinesApp', ['ngRoute', 'ui.materialize', 'jquery-alt']);

/**
 * configure master page routes
 * @controller need to be added
 */
 app.config(function($routeProvider , $locationProvider) {
    $routeProvider.when('/', {
            templateUrl : 'views/landing.html'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'views/static/about.html'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'views/static/contact.html'
        })
        // route for the help page
        .when('/help', {
            templateUrl : 'views/static/help.html'
        })
        // route for the Terms & Conditions page
        .when('/termsAndConditions', {
            templateUrl : 'views/static/termsAndConditions.html'
        })
        // route for the Privacy Policy page
        .when('/privacypolicy', {
            templateUrl : 'views/static/privacypolicy.html'
        })
        // route for the Booking a Flight page
        .when('/bookAFlight', {
            templateUrl : 'views/bookAFlight.html'
        })
        // route for the Offers page
        .when('/offers', {
            templateUrl : 'views/offers.html'
        })
        // route for the Pricing page
        .when('/pricing', {
            templateUrl : 'views/pricing.html'
        })

        //route for the flight booking page
        .when('/flights',{
            templateUrl : 'views/flights.html'
        })

        //route for the passnegers details
        .when('/passengers',{
            templateUrl : 'views/passengers.html'
        })

        //route for the confirmation page
		.when('/confirmation',{
        	templateUrl : 'views/confirm.html'
        })

        // route for payment page
        .when('/payment', {
            templateUrl : 'views/payment.html'
        })

        //route for end of journy :v
        .when('/successful', {
            templateUrl : 'views/successful-payment.html'
        });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    });
/**
 * take the mail from the view and make
 * post request to add the mail to Newsletter
 * @uncomment after creating the Post route
 */
 app.controller('masterController', function($scope, $location) {
    $scope.subscribeData = {};
    $scope.subscribe = function() {
      // $http.post("api/subscrib",$scope.subscriberMail)
      // $http.post("api/subscribe",$scope.subscriberMail)
      // .success(function() {
      //         $scope.subscriberMail = {};
      //         console.log('Done: ' + data);
      //
      // })
      // .error(function() {
      //         console.log('Error: ' + data);
      // });

        if($scope.subscribeData.email){
            Materialize.toast('You have been added to our mailing list.', 4000);
            $scope.subscribeData.email = '';
        }
    };
});


app.controller('contactUsCtrl',function($scope, $location){
    $scope.formData = {};
    $scope.send = function(){
        console.log($scope.formData);
        Materialize.toast('We have received your message. Thank you!', 4000);
        $location.path('/');
    }

});
