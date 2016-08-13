var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';
}]);