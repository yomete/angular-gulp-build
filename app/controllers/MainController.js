app.controller('MainController', function($scope, $localStorage, $sessionStorage, Restangular) {
	$scope.message = 'Gbesk!'
	$scope.data = 2 + "4";

	var vm = this;

	function initialize() {
		var address = (document.getElementById('my-address'));
		var autocomplete = new google.maps.places.Autocomplete(address);
		autocomplete.setTypes(['geocode']);
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				return;
			}

			var address = '';
			if (place.address_components) {
				address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
				].join(' ');
			}
		});
	}

	$scope.getCor = function codeAddress() {
		geocoder = new google.maps.Geocoder();
		var address = document.getElementById("my-address").value;
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				$scope.myLatt = results[0].geometry.location.lat();
				$scope.myLngg = results[0].geometry.location.lng();

				$localStorage.myLat = results[0].geometry.location.lat();
				$localStorage.myLng = results[0].geometry.location.lng();

				console.log($scope.myLatt);
				console.log($scope.myLngg);

				return $http.get('https://api.forecast.io/forecast/95433fd64fd7a4ac6c4209328ef5bc8d/6.674881099999999,3.198052700000062')
					.then(function (data) {
						console.log(data);
					})

			}
			else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});

	};


	google.maps.event.addDomListener(window, 'load', initialize);
})