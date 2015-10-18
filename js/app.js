/**
 * Created by Branislav Vidojevic on 15/10/2015.
 */
var app = angular.module("app", ['ngRoute', 'duScroll'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/documentation', {
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            })
            .when('/examples', {
                templateUrl: 'views/examples.html',
                controller: 'ExampleCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
    });

//default scroll duration
app.value('duScrollDuration', 850);

app.controller('DocsCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('documentation.json').success(function (data) {
        $scope.docs = data.docs;
    }).error(function () {
        console.log('Error, GET documentation.json failed.');
    });

    $scope.formatJson = function (text) {
        return JSON.stringify(JSON.parse(text), null, 2);
    }

}]);

app.controller('ExampleCtrl', ['$scope', function ($scope) {

}]);

app.controller('AboutCtrl', ['$scope', function ($scope) {

}]);
