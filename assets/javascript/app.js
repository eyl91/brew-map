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


//--------------------- Front End--------------------------->


	function displayTopMenu() {
		// Make Fixed menu appear by changing it's css...
	    $('.top-menu').css('opacity', '1');
	};


	$('.submit-btn-loc').on('click', function() {
			$('.main-container').html('');
	        // Add New style to Main Container...
	        $('.main-container').addClass('hops');
	        // Run function createTable...
	        createTable();
	});


	$('.submit-btn-code').on('click', function() {
			// Save the value entered by the user inside a variable...
	        var usersLocationInput = $('#zipcode').val();
	        // Verify value is not empty
	        if (usersLocationInput > 0) {
	         	// Call function to display Fixed menu...
	         	displayTopMenu();
	         	// Empty Main Container...
	         	$('.main-container').html('');
	         	// Add New style to Main Container...
	         	$('.main-container').addClass('hops');
	         	// Run function createTable...
	         	createTable();
	        } else {
	        	// Don't proceed...
	        	return;
	        };     
	}); 


			function createTable() {
				var tableContainer = $('<div>').addClass('table-cont');
				// Create table add Class and Id attributes...
				var table = $('<table>').addClass('table');
				table.attr('id', 'breweryList');
				// Create table row...
				var row = $('<tr>');
				// Create Table Body...
				var tableBody = $('<tbody>');
				// Text for table headers.
				var hedrs = ['Brewery Name', 'Address', 'Phone Number', 'Distance', 'Logo']; 
				// Add Class and header to the Main Container...
				$('.main-container').addClass('row');
				$('.main-container').html('<h4 class="table-name">Search Results</h4>');
				// Creates a TH tag for every item on the hedrs array...
				for(i = 0; i < hedrs.length; i++) {
				   	var tabHead = $('<th>').attr('scope', 'col');
				   	// Insert text to each tabHead...
				   	tabHead.text(hedrs[i]);
				   	// Insert TH to the TR element...
				    row.append(tabHead);
				};
				// Insert Table Row to the table...
				table.append(row);
				// Insert Table to the Main Container...
				$(tableContainer).append(table);
				$(tableContainer).append(tableBody);
				$('.main-container').append(tableContainer);
			};
}); // Document Closing tag...





