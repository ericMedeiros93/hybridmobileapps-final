$(document).on('pagecreate', '#route', function() {
	var user=localStorage.getItem("username");
	$('#curUser').text("Signed in as: " + user);
});