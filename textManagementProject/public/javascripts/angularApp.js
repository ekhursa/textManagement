var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
		'$scope', '$http',

		function ($scope, $http) {
			$scope.doReply = function () {
				console.log("hey you cilcked me");
			}
			$scope.formModel = {};
			$scope.cityInfo = {};
			$scope.selectedText = null;

			$scope.getAllTextByUser = function () {
				$scope.textByUser = [];
				$http.get('/texts').then(function (response) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].user == $scope.formModel.user)
							$scope.textByUser.push(response.data[i].text);
					}
				})
			}

			$scope.getAllTextsFormatted = function () {
				$http.get('/texts').then(function (response) {
					var allTextsArray = response.data;
					var textArraySorted = [];
					/*for (var i = 0; i < allTextsArray.length; i++) {
						if (allTextsArray[i].parentId == null)
						textArraySorted.push(allTextsArray[i]);
						for (var j = 0; j < allTextsArray.length; j++) {
							if (allTextsArray[j].parentId == allTextsArray[i]._id)
								textArraySorted.push(allTextsArray[j]);
						}
					}*/
					$scope.allTexts = allTextsArray;
					
				})
			}

			$scope.submitText = function () {
				$http.post('/texts', $scope.formModel).success(function (data) {
					$scope.text = data.text;
					$scope.formModel.text = null;
					$scope.formModel.user = null;
				})

				$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.formModel.city + '&units=metric&APPID=126e45d0ac2ab9bff45c530cbf7836d7').then(function (response) {
					$scope.cityInfo.longitude = response.data.coord.lon;
					$scope.cityInfo.latitude = response.data.coord.lat;
					$scope.cityInfo.temperature = response.data.main.temp;
				})

				$scope.getAllTextsFormatted();

			}; // add on delete as well
		}

	])
