$(document).on('pagebeforeshow', '#location', function() {
	if (navigator.geolocation) {
		function success(pos) {
			if (localStorage) {
				if (localStorage.getItem("username") == null) {
					alert("You must be signed in to view the route");
					window.location.assign("index.html");

				} else {
					getData(pos);
				}
			} else {
				getData(pos);

			}
		}

		function fail(pos) {
			//drawMap(new google.maps.LatLng(38.50, -90.50);
			alert("Geolocation failed.");
		}

		function handleGeoError(pos) {
			if (err.code == 0) {
				alert("unknown");
			}
			if (err.code == 1) {
				alert("permission denied");
			} else if (err.code == 2) {
				alert("position unavailable");
			} else if (err.code == 3) {
				alert("timeout.");
			}
		}
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		//drawMap(new google.maps.LatLng(38.50, -90.50);
		alert("There was a problem.");
	}

	var route = new Route();

	function getData(pos) {
		$.ajax({

			url: 'json/stop.json',
			type: 'GET',
			dataType: 'json',
			//crossDomain: true,
			success: function(data) {
				for (var i = 0; i < data.length; i++) {


					if (i == (data.length - 1)) {
						route.finish = new google.maps.LatLng(data[i].lat, data[i].lng);
					} else {
						route.addStop({
							location: (new google.maps.LatLng(data[i].lat, data[i].lng)),
							stopover: true
						});
					}


				}
				drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			},
			error: function() {
				alert("Error");
			}
		});
	}


	function drawMap(latlng) {
		route.start = latlng;
		var myOptions = {
			zoom: 8,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "You are here."
		});
		// 
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();


		directionsDisplay.setMap(map);
		var request = {
			origin: route.start,
			destination: route.finish,
			waypoints: route.stops,
			optimizeWaypoints: true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});

	}
});


$(document).on('pagecreate', '#location', function() {
	if (localStorage) {
		var fS = localStorage.getItem("fS");
		var user = localStorage.getItem("username");
		if (user !== null && user !== "" && user !== 'undefined') {
			$('#curUser').text("Signed in as: " + user);
		} else
			$('#signOut').html("Sign in");
	}
	$('#signOut').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var user = localStorage.getItem("username");
		if (user === null || user === "") {
			//$.mobile.changePage("index.html");
			window.location.assign("index.html");
			//$("#content").load("index.html");
		} else {
			localStorage.removeItem("username");
			location.reload();
		}
	});
});