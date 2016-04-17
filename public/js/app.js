var app = angular.module('austrianAirlinesApp', ['ngRoute', 'ui.materialize', 'jquery-alt', 'ngMaterial']);
/**
 * Token to be used for authentication.
 * Generated online using jwtbuilder
 * Can be stored in $localStorage
 */
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';

/**
 * configure master page routes
 * @controller need to be added
 */
 app.config(function($routeProvider , $locationProvider, $httpProvider) {
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

        // route for successful payment
        .when('/successful', {
            templateUrl : 'views/successful-payment.html'
        })

        //route for booking history
        .when('/booking-history', {
            templateUrl : 'views/booking-history.html'
        })

        // route for error page
        .when('/error', {
            templateUrl : 'views/static/error404.html'
        });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        /**
         * Interceptor to inject every HTTP request with the JSON web token
         */
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
               'request': function (config) {
                   config.headers = config.headers || {};
                   config.headers['x-access-token'] = token;
                   return config;
               },
               'responseError': function (response) {
                   if (response.status === 401 || response.status === 403) {
                    //TODO: $location.path('/unauthorized');
                   }
                   return $q.reject(response);
               }
           };
        }]);

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
