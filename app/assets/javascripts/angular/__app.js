'use strict';

var app = angular.module('MusicGular', ['ngResource']).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/assets/main.html',
        controller: 'MainCtrl'
      })
      .when('/job/:jobId',{
        templateUrl: '/assets/single.html',
        controller: 'JobCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


app.config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }]);