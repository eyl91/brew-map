$(document).ready(function(){

	var lat;
	var lng;
	var zip;
	var radius = 5;//default search radius

	//triggers ajaxByLocation
	$(document).on("click", '#location-button', function(event){
		event.preventDefault();
		$("#breweryList > tbody").empty();
		ajaxByLocation();
		initMap();
	});
	//gets user selected search radius
	$(document).on("click", '#radius-dropdown', function(event){
		radius = $(this).val();
	});	
	//triggers ajaxByZip
	$(document).on("click", '#zipcode-button', function(event){
		event.preventDefault();
		zip = $("#zipcode").val().trim();
		console.log(zip);
		$("#breweryList > tbody").empty();
		ajaxByZip();
		initMap();
	});
	//gets the users location and stores in lat and lng
	function getLocation() {
    	navigator.geolocation.getCurrentPosition(function(position) {
   			lat = position.coords.latitude;
   		 	lng = position.coords.longitude;
   			logResults();
    	})
	}
      function initMap() {
        var userPosition = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: userPosition
        });
        var marker = new google.maps.Marker({
          position: userPosition,
          map: map
        });
      }
	//console logs user coordinates
	function logResults(){
		console.log("Latitude = " + lat);
		console.log("Longitude = " + lng);
	}
	//initiates breweryDB ajax by user location
	function ajaxByLocation(){
		var key = "add62ea870e1bfdea1eee00e3594dbf5";
		var queryLocationURL = "https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/search/geo/point?lat=" + lat + "&lng=" + lng + "&radius=" + radius + "&key=" + key +"";

		$.ajax({
			url: queryLocationURL,
			method: "GET"
		}).done(function(response) {
			console.log(response.data);
		//looping thru results and adding to table
			var results = response.data;

			for (var i = 0; i < results.length; i++){
				var tdRow = $("<tr>");
				var name = $("<td>");
				name.text(results[i].brewery.name);
				var dis = $("<td>")
				dis.text(results[i].distance + " miles");
				var address = $("<td>");
				address.text(results[i].streetAddress);
				var phone = $("<td>");
				phone.text(results[i].phone);
				var image = $("<td>");
				var imageSrc = $("<img>");
				image.append(imageSrc);
				imageSrc.attr("src", results[i].brewery.images.squareLarge);
				console.log(results[i].brewery.images.squareLarge)
				tdRow.append(name);
				tdRow.append(address);
				tdRow.append(phone);
				tdRow.append(dis);
				tdRow.append(image);
				$("#breweryList > tbody").append(tdRow); 
			}

		})

	}

	//initiates breweryDB ajax by zipcode
	function ajaxByZip(){
		var key = "add62ea870e1bfdea1eee00e3594dbf5";
		var queryZipURL = "https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/locations?key=" + key + "&postalCode=" + zip + "";

		$.ajax({
			url: queryZipURL,
			method: "GET"
		}).done(function(response) {
			console.log(response.data);
		//looping thru results and adding to table
			var results = response.data;

			for (var i = 0; i < results.length; i++){
				var tdRow = $("<tr>");
				var name = $("<td>");
				name.text(results[i].brewery.name);
				var address = $("<td>");
				address.text(results[i].streetAddress);
				var phone = $("<td>");
				phone.text(results[i].phone);
				tdRow.append(name);
				tdRow.append(address);
				tdRow.append(phone);
				$("#breweryList > tbody").append(tdRow); 
			}
		})
	}	
	
getLocation();

});