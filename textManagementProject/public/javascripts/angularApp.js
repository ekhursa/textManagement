var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
		'$scope', '$http',

		function ($scope, $http) {

			$scope.test = 'Please enter a Text';
			$scope.formModel = {};
			$scope.cityInfo = {};
			$scope.submitText = function () {
				$http.post('/texts', $scope.formModel).success(function (data) {
					$scope.text = data.text;
				})

				/*$http.get('api.openweathermap.org/data/2.5/weather?q=' + $scope.formModel.city + '&APPID=126e45d0ac2ab9bff45c530cbf7836d7').then(function (response) {
					$scope.text = response.data;
				})*/

			}; // add on delete as well
			/*$http.get('/texts').then(function (response) {
			$scope.text = response.data[0].text;

			})*/
		}

	])
