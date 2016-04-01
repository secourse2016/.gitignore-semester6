
    var app = angular.module('austrianAirlinesApp', ['ngRoute', 'ui.materialize', 'jquery-alt']);

/**
 * configure master page routes
 * @controller need to be added
 */
 app.config(function($routeProvider , $locationProvider) {
    $routeProvider.when('/', {
            templateUrl : 'views/landing.html'
        })

        // route for payment page
        .when('/payment', {
            templateUrl : 'views/payment.html'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'views/about.html'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'views/contact.html'
        })
        // route for the help page
        .when('/help', {
            templateUrl : 'views/help.html'
        })
        // route for the Terms & Conditions page
        .when('/termsAndConditions', {
            templateUrl : 'views/termsAndConditions.html'
        })
        // route for the Privacy Policy page
        .when('/privacypolicy', {
            templateUrl : 'views/privacypolicy.html'
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
        //route for end of journy :v
        .when('/successful', {
            templateUrl : 'views/successful-payment.html'
        })
        
        ;
        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    });
/**
 * take the mail from the view and make
 * post request to add the mail to Newsletter
 * @uncomment after creat the Post rout
 */
 app.controller('masterController', function($scope) {
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
    };
});

app.controller('sliderController', function($scope){
    this.slides = landingSlides;

});

var landingSlides = [
     {
        image: './assets/images/landing/landing_1.jpg',
        text : 'Feel the Comfort and Luxury.',
        entrance: 'left-align'
    },
    {
        image: './assets/images/landing/landing_2.jpg',
        text : 'Have Safe Flights.',
        entrance: 'center-align'
    },
    {
        image: './assets/images/landing/landing_3.jpg',
        text : 'High Technology Airplanes.',
        entrance: 'right-align'
    }
];
