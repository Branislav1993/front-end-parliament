/**
 * Created by Branislav Vidojevic on 15/10/2015.
 */
var app = angular.module("app", []);

app.value

app.controller('membersCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('members.json').success(function (data) {
        $scope.docs = data.docs;
    }).error(function () {
        console.log('Error, GET member.json failed.');
    });

    $scope.formatJson = function (text) {
        return JSON.stringify(JSON.parse(text), null, 2);
    }
}]);