var app = angular.module('austrianAirlinesApp', ['ngRoute', 'ui.materialize', 'jquery-alt', 'ngMaterial']);
/**
 * Token to be used for authentication.
 * Generated online using jwtbuilder.
 * Can be stored in $localStorage.
 */
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';

/**
 * Configure master page routes.
 * @controller need to be added.
 */
app.config(function($routeProvider , $locationProvider, $httpProvider) {
    $routeProvider.when('/', {
            templateUrl : 'views/landing.html'
        })

        // About page route
        .when('/about', {
            templateUrl : 'views/static/about.html'
        })

        // Contact page route
        .when('/contact', {
            templateUrl : 'views/static/contact.html'
        })
        // Help page route
        .when('/help', {
            templateUrl : 'views/static/help.html'
        })
        // Terms & Conditions page route
        .when('/termsAndConditions', {
            templateUrl : 'views/static/termsAndConditions.html'
        })
        // Privacy Policy page route
        .when('/privacypolicy', {
            templateUrl : 'views/static/privacypolicy.html'
        })
        // Booking a Flight page route
        .when('/bookAFlight', {
            templateUrl : 'views/bookAFlight.html'
        })
        // Offers page route
        .when('/offers', {
            templateUrl : 'views/offers.html'
        })
        // Pricing page route
        .when('/pricing', {
            templateUrl : 'views/pricing.html'
        })

        // Flight booking page route
        .when('/flights',{
            templateUrl : 'views/flights.html'
        })

        // Passnegers details page route
        .when('/passengers',{
            templateUrl : 'views/passengers.html'
        })

        // Confirmation page route
		    .when('/confirmation',{
        	templateUrl : 'views/confirm.html'
        })

        // Payment page route
        .when('/payment', {
            templateUrl : 'views/payment.html'
        })

        // Successful payment page route
        .when('/complete', {
            templateUrl : 'views/successful-payment.html'
        })

        //route for booking history
        .when('/booking', {
            templateUrl : 'views/booking-history.html'
        })

        // route for error page
        // TODO: Not Found Page route
        .when('/error', {
            templateUrl : 'views/static/error404.html'
        });

    // Use the HTML5 History API
    $locationProvider.html5Mode(true);


    /**
    * Set the public key for stripe
    */
    Stripe.setPublishableKey('pk_test_GLghvbf0O1mNsV4T8nECOC1u');
    /**
     * Interceptor to inject every HTTP request with the JSON web token.
     */
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location){
        return {
           'request': function(config){
               config.url = config.url+"?wt=" + token;
               return config;
           },
           'responseError': function(response){
               if (response.status === 401 || response.status === 403){
                //TODO: $location.path('/unauthorized');
               }
               return $q.reject(response);
           }
       };
   }]);
});

/**
 * TODO
 * Take the mail from the view and make
 * post request to add the mail to Newsletter
 * uncomment after creating the Post route
 */
app.controller('masterController', function($scope, $location){
    $scope.subscribeData = {};
    $scope.subscribe = function(){
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
        Materialize.toast('We have received your message. Thank you!', 4000);
        $location.path('/');
    }
});
