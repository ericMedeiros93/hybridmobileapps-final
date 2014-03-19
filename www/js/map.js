/*
var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);


function initialize() {
	var myOptions = {
        center: new google.maps.LatLng(43.591525,-79.638069),
        zoom: 8,   
        mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map-canvas"),myOptions);
*/
function initialize() {
    // Also works with: var yourStartLatLng = '59.3426606750, 18.0736160278';
    var LatLng = new google.maps.LatLng(59.3426606750, 18.0736160278);
    $('#map-canvas').gmap({'center': LatLng});
    
    $('#home').live("pageshow", function() {
                $('#map-canvas').gmap('refresh');
        });
    $('#home').live("pageinit", function() {
                $('#map-canvas').gmap({'center': '59.3426606750, 18.0736160278'});
    });
});