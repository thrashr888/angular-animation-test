/*globals TweenMax*/
'use strict';

angular.module('angularAnimationTestApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'firebase'
])

  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function() {
        // console.log($scope, $rootScope, $route, $location);
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        // console.log($scope, $rootScope, $route, $location);
    });
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        resolve: {
          items: function (firebaseUrl, $firebase) {
            return $firebase(new Firebase(firebaseUrl + '/items').limit(15));
          }
        }
      })
      .when('/item/:id', {
        templateUrl: '/views/item.html',
        controller: 'ItemCtrl',
        resolve: {
          item: function (firebaseUrl, $firebase, $route) {
            return $firebase(new Firebase(firebaseUrl + '/items/' + $route.current.params.id));
          }
        }
      })
      .when('/page/:slug', {
        template: '<div ng-include="{{page}}"></div>',
        controller: 'PageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .constant('firebaseUrl', 'https://angular-animation-test.firebaseio.com')

  .animation('.list-out', ['$window',function($window) {
    return {
      start : function(element, done) {
        TweenMax.set(element, {position:'relative'});

        var duration = 1;
        //we can use onComplete:done with TweenMax, but lets use
        //a delay value for testing purposes
        TweenMax.to(element, 1, {opacity:0, width:0});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])

  .animation('.list-in', ['$window',function($window) {
    return {
      setup: function(element) {
        TweenMax.set(element, {opacity:0, width:0});
      },
      start : function(element, done) {
        var duration = 1;
        //we can use onComplete:done with TweenMax, but lets use
        //a delay value for testing purposes
        TweenMax.to(element, duration, {opacity:1, width:210});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])

  .animation('.list-move', ['$window',function($window) {
    return {
      start : function(element, done) {
        var duration = 1;
        //we can use onComplete:done with TweenMax, but lets use
        //a delay value for testing purposes
        TweenMax.to(element, duration, {opacity:1, width:210});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])
  ;
