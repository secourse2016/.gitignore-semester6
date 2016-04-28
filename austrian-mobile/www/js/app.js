// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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
}).config(function($stateProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    views : {

      'main-view' : {
        templateUrl: 'partials/home.html'
      },
      'tab-book' : {
        templateUrl: 'partials/search.html'
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
  })
  .state('faq', {
    url: '/faq',
    templateUrl: 'partials/faq.html'
  });
})
.controller('masterController',function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
