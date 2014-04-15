//Check to make sure we can get user location
$(document).on('pagebeforeshow', '#location', function() {
	if (navigator.geolocation) {
		function success(pos) {
			//Check for local storage
			if (localStorage) {
				//Check if user is signed in
				if (localStorage.getItem("username") === null) {
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
			if (err.code === 0) {
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
	//Method parses through the json file and adds values to the route variable
	function getData(pos) {
		$.ajax({

			url: 'http://mobile.sheridanc.on.ca/~medeeric/SYST35300/hybridmobileapps-final-master/www/json/stop.json',
			type: 'GET',
			dataType: 'json',
			//crossDomain: true,
			success: function(data) {
				for (var i = 0; i < data.length; i++) {

					//Add the last stop as the finish
					if (i == (data.length - 1)) {
						route.finish = new google.maps.LatLng(data[i].lat, data[i].lng);
					} else {
						//Add stops as waypoints
						route.addStop({
							location: (new google.maps.LatLng(data[i].lat, data[i].lng)),
							stopover: true
						});
					}


				}
				drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			},
			error: function() {
				alert("Could not get data. Please ensure you are connected to the internet.");
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

		//Plot markers on the map, inclues start, finish, and stops in between.
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

//Display the user name, sign in/sign out button function
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
