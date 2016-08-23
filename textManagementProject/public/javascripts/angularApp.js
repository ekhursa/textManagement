var app = angular.module('textManagement', []);

app.controller('textManagementCtrl', [
		'$scope', '$http', '$rootScope',

		function ($scope, $http, $rootScope) {
			$rootScope.formModel = {};
			$rootScope.formModel.city = null;
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
				var textsByUserArray = new Array();
				$http.get('/texts').success(function (data) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].user == $rootScope.formModel.user) {
							var line = data[i].text + " " + data[i].date;
							textsByUserArray.push(line);
						}
						$scope.textsByUser = textsByUserArray.toString();
					}
				})
				.error(function (data) {
					$scope.textsByUser = data;
				})
			}

			$scope.getAllTextsFormatted = function () {
				$http.get('/texts/forumView').success(function (data) {
					$scope.allTexts = data;
				})
				.error(function (data) {
					$scope.text = data;
				})
			}

			$scope.submitText = function () {
				$scope.cityInfo.longitude = null;
				$scope.cityInfo.latitude = null;
				$scope.cityInfo.temperature = null;

				$http.post('/texts', $rootScope.formModel).success(function (data) {
					$scope.text = data.text;
					$rootScope.formModel.text = null;
					$rootScope.formModel.user = null;
					$rootScope.formModel.parentId = null;
				})

				.error(function (data) {
					$scope.text = data;
				})
				if ($rootScope.formModel.city) {
					$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $rootScope.formModel.city +
						'&units=metric&APPID=126e45d0ac2ab9bff45c530cbf7836d7').success(function (data) {
						$scope.cityInfo.longitude = data.coord.lon;
						$scope.cityInfo.latitude = data.coord.lat;
						$scope.cityInfo.temperature = data.main.temp;
					})

					.error(function (data) {
						$scope.text += data;
					})
				}

				$scope.getAllTextsFormatted();

			}; // add on delete as well
		}

	])
