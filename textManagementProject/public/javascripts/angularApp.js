var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
'$scope',
function($scope){
  $scope.test = 'Please enter a Text';
}]);