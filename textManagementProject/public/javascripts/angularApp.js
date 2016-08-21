var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
		'$scope', '$http', '$rootScope',

		function ($scope, $http, $rootScope) {
			$rootScope.formModel = {};
			$scope.cityInfo = {};
			$rootScope.set_color = function (textId) {
				if (textId == $rootScope.formModel.parentId) {
					return {
						color : "red"
					}
				} else {
					return {
						color : "black"
					}
				}
			}

			$rootScope.set_textId = function (textId) {
				if (textId == $rootScope.formModel.parentId) {
					$rootScope.formModel.parentId = null;
				} else {
                    $rootScope.formModel.parentId = textId;
				}
			}

			$scope.getAllTextByUser = function () {
				$scope.text = new Array();
				$http.get('/texts').then(function (response) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].user == $rootScope.formModel.user) {
							$scope.text.push(response.data[i].text);
							console.log(response.data[i].text);
						}
					}
				})
			}

			$scope.getAllTextsFormatted = function () {
				$http.get('/texts/forumView').then(function (response) {
					$scope.allTexts = response.data;
				})
			}

			$scope.submitText = function () {
				$http.post('/texts', $rootScope.formModel).success(function (data) {
					$scope.text = data.text;
					$rootScope.formModel.text = null;
					$rootScope.formModel.user = null;
				})

				$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $rootScope.formModel.city +
					'&units=metric&APPID=126e45d0ac2ab9bff45c530cbf7836d7').then(function (response) {
					$scope.cityInfo.longitude = response.data.coord.lon;
					$scope.cityInfo.latitude = response.data.coord.lat;
					$scope.cityInfo.temperature = response.data.main.temp;
				})

				$scope.getAllTextsFormatted();

			}; // add on delete as well
		}

	])
