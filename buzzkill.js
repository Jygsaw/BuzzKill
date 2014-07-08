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

app.controller('mainController', function($scope, $firebase, FIREBASE_URL) {
  // var drinksRef = new Firebase(FIREBASE_URL + "drinklist");
  // var newDrinkRef = drinksRef.push();

  // newDrinkRef.set({
  //   name: 'Long Island Iced Tea',
  //   image: 'http://static.squarespace.com/static/5176fdb5e4b083b631f31303/t/525eaec9e4b0880126d6821f/1381936843998/bigstock-Long-Island-Iced-Tea-43438963.jpg',
  //   price: '$5 million'
  // });

  // console.dir(drinksRef);
  // console.log("new drink rec: " + newDrinkRef.name());
  // $scope.display = "mulligan";
});


app.controller("OrderController", function($scope, $firebase, FIREBASE_URL) {
  $scope.drinkorder = [];

  // initialize drink list
  var drinklistRef = new Firebase(FIREBASE_URL + 'drinklist');
  $scope.drinklist = $firebase(drinklistRef);

  $scope.addToOrder = function(drink) {
    console.log("adding to order:" + drink.name);
    $scope.drinkorder.push(drink);
  };
  $scope.removeFromOrder = function(index) {
    $scope.drinkorder.splice(index, 1);
  };
  $scope.orderDrinks = function() {
    console.log("Sending drink order");

    // initialize tab drinks
    var drinksRef = new Firebase(FIREBASE_URL + 'drinks');
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
  $scope.drinks = {};
  $scope.open = true;

  // initialize tab drinks
  var drinksRef = new Firebase(FIREBASE_URL + 'drinks');
  $scope.drinks = $firebase(drinksRef);
  console.log($scope.drinks);

  // TODO fix open/close tab code
  // $scope.openTab = function() {
  //   if ($scope.name !== null) {
  //     var tabsRef = new Firebase(FIREBASE_URL + 'tabs');
  //     tabsRef.$add($scope.tab);
  //     $scope.open = true;
  //     console.log("Tab opened: " + $scope.name);
  //     console.log("=> id: " + newTabRef.name());
  //   }
  // };
  // $scope.closeTab = function() {
  //   var tabsRef = new Firebase(FIREBASE_URL + 'tabs');
  //   tabsRef.$remove($scope.tab);
  //   $scope.open = false;
  // };
});
