/**
 * Created by Branislav Vidojevic on 15/10/2015.
 */
var app = angular.module("app",[]);

app.controller('memberCtrl', ['$scope', '$http', function($scope, $http){

    $http.get('members.json').success(function(data){
        $scope.d = data;
        var text = data.result;
        $scope.json = JSON.stringify(JSON.parse(text),null,2);
    }).error(function(){
        alert('Greska!!!');
    });


}]);
