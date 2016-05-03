// Ionic Starter App
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMaterial'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 $ionicConfigProvider.backButton.text('');
  $stateProvider
  .state('index', {
    url: '/',
    views : {

      'main-view' : {
        templateUrl: 'partials/home.html'
      }
    }

  })
  .state('search', {

    url: '/search',
    views : {

      'main-view' : {
        templateUrl: 'partials/search.html'
      }
    }

  })
  .state('flights', {
    url: '/flights',
    views : {

      'main-view' : {
        templateUrl: 'partials/flights.html'
      }
    }

  })
  .state('about', {
    url: '/about',
    views : {
      'main-view' : {
        templateUrl: 'partials/about.html'
      }
    }
  })
  .state('passengers', {
    url: '/passengers',
    views : {
      'main-view' : {
        templateUrl: 'partials/passengers.html'
      }
    }
  }) .state('confirmation', {
    url: '/confirmation',
    views : {
      'main-view' : {
        templateUrl: 'partials/confirmation.html'
      }
    }
  })
  .state('faq', {
    url: '/faq',
      views : {
        'main-view' : {
          templateUrl: 'partials/faq.html'
        }
      }
  })
  .state('payment', {
    url: '/payment',
    views : {
      'main-view' : {
        templateUrl: 'partials/payment.html'
      }
    }
  })
  .state('complete', {
    url: '/complete',
    views : {
      'main-view' : {
        templateUrl: 'partials/successful.html'
      }
    }
  })
  .state('booking-find', {
    url: '/booking/find',
    views : {
      'main-view' : {
        templateUrl: 'partials/booking-find.html'
      }
    }
  })
  .state('booking-history', {
    url: '/booking',
    views : {
      'main-view' : {
        templateUrl: 'partials/booking-history.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/');



  /*
   * Set the public key for stripe
   */
   Stripe.setPublishableKey('pk_test_GLghvbf0O1mNsV4T8nECOC1u');
})
.controller('masterController',function($scope, $ionicSideMenuDelegate,$ionicHistory){
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();

  };
  $scope.$on('$ionicView.beforeEnter', function (e, data) {
    if (data.enableBack) {
        $scope.$root.showMenuIcon = false;
    } else {
        $scope.$root.showMenuIcon = true;
    }
});
});
