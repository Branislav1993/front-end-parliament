/**
 * Created by Branislav Vidojevic on 15/10/2015.
 */

var host = "http://localhost:9090/api";

var app = angular.module("app", ['ngRoute', 'ngAnimate', 'duScroll', 'ui.bootstrap', 'ngResource'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/documentation', {
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            })
            .when('/examples', {
                templateUrl: 'views/examples.html',
                controller: 'ExampleCtrl'
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

app.controller('ExampleCtrl', ['$scope', 'memberService', function ($scope, memberService) {

    $scope.maxSize = 1;
    $scope.totalItems = 11;
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.count = 0;

   var req = memberService.MembersR.query({page: '1'}, function (data) {
       $scope.members = data;
   });

    $scope.getMembers = function (n, text) {
        memberService.MembersR.query({page: n.toString(), query: text}, function (data) {
            $scope.members = data;
            $scope.count = (n-1) * 10;
            $scope.totalItems = n*$scope.itemsPerPage+1;
        });
    };

    $scope.maxSize1 = 1;
    $scope.totalItems1 = 11;
    $scope.itemsPerPage1 = 10;
    $scope.currentPage1 = 1;
    $scope.count1 = 0;

    $scope.getSpeeches = function(selectedMember, pageNum) {
        memberService.SpeechesR.query({id: selectedMember.toString(), page: pageNum.toString()}, function (data) {
            $scope.speeches = data;
            $scope.count1 = (pageNum-1) * 10;
            $scope.id = selectedMember;
            $scope.totalItems1 = pageNum*$scope.itemsPerPage1+1;
        });
    };

}]);

app.controller('MainCtrl', ['$scope', function ($scope) {

}]);

app.service('memberService', ['$resource', function ($resource) {
    this.MembersR = $resource(host + '/members');
    this.SpeechesR = $resource(host + '/members/:id/speeches');
}]);
