angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
        })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
        })
    })
  .controller('MainController', ['$scope', function($scope){
    $scope.a = 'yes'
  }])

  .controller('HomeController', ['$scope', '$http', function($scope, $http){
    $scope.x = 'fart'
    $scope.onSubmitForm1 = function(){
      var obj = {
        name: $scope.name,
        title: $scope.title
      }
      $http.post("api/post", JSON.stringify(obj))
        .then(function(res) {
          console.log(obj)

          console.log(res.data)
      })
    }
  }])

  .controller('AboutController', ['$scope', '$http', function($scope, $http){
    $http.get("api/posts")
      .then(function(res) {
        console.log(res)
        $scope.results = res.data
    })

    $scope.deleteItem = function(item){
      var obj = {
        _id: item._id
      }
      $http.post("api/delete", JSON.stringify(obj))
        .then(function(res) {
          console.log(obj)

          console.log(res.data)
      })
      //Then get updated data
      $http.get("api/posts")
        .then(function(res) {
          console.log(res)
          $scope.results = res.data
      })
    }
  }])
