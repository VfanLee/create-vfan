'use strict'

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'modules/login/login.html',
      controller: 'LoginCtrl',
      resolve: {
        load: function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['modules/login/login.js'],
          })
        },
      },
    })
    .state('main', {
      url: '/main',
      templateUrl: 'modules/main/main.html',
      controller: 'MainCtrl',
      resolve: {
        load: function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['modules/main/main.js'],
          })
        },
      },
    })
  $urlRouterProvider.otherwise('/main')
})
