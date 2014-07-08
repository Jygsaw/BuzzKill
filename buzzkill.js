var app = angular.module('buzzkill', ['ui.router', 'firebase'])
.constant('FIREBASE_URL', 'https://buzzkill.firebaseio.com/');

app.config(function($stateProvider, $urlRouterProvider) {
  // redirect to main page if url not recognized
  $urlRouterProvider.otherwise("/main");

  // set up routing
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "main.html"
    })
    .state('order', {
      url: "/order",
      templateUrl: "order.html"
    })
    .state('pickup', {
      url: "/pickup",
      templateUrl: "pickup.html"
    })
    .state('tab', {
      url: "/tab",
      templateUrl: "tab.html"
    })
    ;
});

app.controller("TabController", function($scope) {
  $scope.name = 'Fred';
  $scope.open = false;

  $scope.openTab = function() {
    $scope.open = true;
    console.log("name: " + $scope.name);
  };
  $scope.closeTab = function() {
    $scope.open = false;
  };
});

