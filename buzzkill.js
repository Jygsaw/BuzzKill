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
    .state('tab', {
      url: "/tab",
      templateUrl: "tab.html"
    })
    .state('order', {
      url: "/order",
      templateUrl: "order.html"
    })
    ;
});


app.controller('mainController', function($scope, $rootScope, $location, $firebase, FIREBASE_URL) {
  $scope.setUser = function() {
    // initialize global user and redirect
    $rootScope.user = $scope.user;
    $location.path('/tab');
  };
});


app.controller("OrderController", function($scope, $firebase, FIREBASE_URL) {
  $scope.drinkorder = [];

  // initialize drink list
  var drinklistRef = new Firebase(FIREBASE_URL + 'drinklist');
  $scope.drinklist = $firebase(drinklistRef);

  $scope.addToOrder = function(drink) {
    $scope.drinkorder.push(drink);
  };
  $scope.removeFromOrder = function(index) {
    $scope.drinkorder.splice(index, 1);
  };
  $scope.orderDrinks = function() {
    // initialize tab drinks
    var drinksRef = new Firebase(FIREBASE_URL + 'users' +  '/' + $scope.user + '/drinks');
    var drinks = $firebase(drinksRef);

    // adding drink order to tab
    for (var i = 0; i < $scope.drinkorder.length; i++) {
      drinks.$add($scope.drinkorder[i]);
    }

    // clear drink order
    $scope.drinkorder = [];
  };
});


app.controller("TabController", function($scope, $firebase, FIREBASE_URL) {
  $scope.tab = {};
  $scope.drinks = {};
  $scope.open = false;

  // checking for open tab
  var userUrl = FIREBASE_URL + 'users' +  '/' + $scope.user;
  var userRef = new Firebase(userUrl);
  userRef.on('value', function(snapshot) {
    if (snapshot.hasChild('tab')) {
      $scope.open = true;
    }
  });

  // retrieve tab drinks
  var drinksRef = new Firebase(FIREBASE_URL + 'users' +  '/' + $scope.user + '/drinks');
  $scope.drinks = $firebase(drinksRef);

  // insert tab data for user
  $scope.openTab = function() {
    if ($scope.tab.cardName !== undefined) {
      var tabUrl = FIREBASE_URL + 'users' +  '/' + $scope.user + '/tab';
      var tabRef = new Firebase(tabUrl);
      tabRef.set($scope.tab);
      $location.path('/order');
    }
  };

  // delete all data for user
  $scope.closeTab = function() {
    var userRef = new Firebase(FIREBASE_URL + 'users' +  '/' + $scope.user);
    userRef.remove();
    $scope.open = false;
  };
});
