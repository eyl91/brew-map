$(document).ready(function(){

	var lat
	var lng

	$(document).on("click", '#location-button', function(event){
		event.preventDefault();
		getLocation();
	});

	function getLocation() {
    	navigator.geolocation.getCurrentPosition(function(position) {
   			lat = position.coords.latitude;
   		 	lng = position.coords.longitude;
   			logResults();
    })
}

	function logResults(){
		console.log("Latitude = " + lat);
		console.log("Longitude = " + lng);
	}

});
