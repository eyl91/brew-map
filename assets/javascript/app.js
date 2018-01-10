$(document).ready(function() {

    var lat;
    var lng;
    var zip;
    var radius = 5; //default search radius
    var map;
    var zipLat;
    var zipLng;


    //reload the page

    $(document).on('click', '.name-tm', function(event) {
        location.reload();
    });

    $(document).on('click', '.name', function(event) {
        location.reload();
    });

    //triggers ajaxByLocation
    $(document).on("click", '#location-button', function(event) {
        getLocation();
        displayTopMenu();
        createTable();
        event.preventDefault();
        $('.main-container').addClass('column');

    });
    //gets user selected search radius

    $(document).on("click", '.dropdown-item', function(event) {
        radius = $(this).val();

    });
    $(document).on("click", '.submit-btn-code', function(event) {
        event.preventDefault();
        var zipOption1 = $("#main-form-tm").val();
        var zipOption2 = $("#main-form").val();

        if (zipOption2 > 0) {
        	zip = zipOption2;
            console.log(zip);
            displayTopMenu();
            ajaxByZip();
            createTable();
        } else if (zipOption1 > 0) {
            zip = zipOption1;
            console.log(zip);
            displayTopMenu();
            ajaxByZip();
            createTable();
        };  

    });
    //gets the users location and stores in lat and lng
    function getLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            $("#breweryList > tbody").empty();
            ajaxByLocation();
            initMap();
            logResults();
        })
    }

    function initMap() {
        var userPosition = { lat: lat, lng: lng };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: userPosition
        });
        var marker = new google.maps.Marker({
            position: userPosition,
            map: map,
            animation: google.maps.Animation.BOUNCE,
        });
    }

    function initMapZip() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: zipLat, lng: zipLng }
        });
    }
    //console logs user coordinates
    function logResults() {
        console.log("Latitude = " + lat);
        console.log("Longitude = " + lng);
    }

    // render table function

    function renderTable(results) {


  

    	for (var i = 0; i < results.length; i++) {
                var marker = new google.maps.Marker({
                    position: { lat: results[i].latitude, lng: results[i].longitude },
                    map: map,
                    title: results[i].brewery.name,
                    icon: "assets/images/icon-beer.png",
                });
                var tdRow = $("<tr>");
                var name = $("<td>");
                name.text(results[i].brewery.name);
          		var dis = $("<td>")
          		if (typeof results[i].distance === 'undefined') {
          			dis.text('');

          		} else {
          			dis.text(results[i].distance + " miles");
          		}

                var address = $("<td>");
                address.text(results[i].streetAddress);
                var phone = $("<td>");
                phone.text(results[i].phone);
                var image = $("<td>");
                var imageSrc = $("<img>");
                image.append(imageSrc);
                if (typeof results[i].brewery.images === 'undefined' ) {
					imageSrc.attr("src", './assets/images/default-beer-logo.png');
            	} else {
            		imageSrc.attr("src", results[i].brewery.images.icon);
            	}

                // defaultImage(results[i].brewery.images.icon;);
                tdRow.append(image);
                tdRow.append(name);
                tdRow.append(address);
                tdRow.append(phone);
                tdRow.append(dis);
                $(".table > tbody").append(tdRow);
            }
    }
     

    //initiates breweryDB ajax by user location
   	function ajaxByLocation() {
        var key = "add62ea870e1bfdea1eee00e3594dbf5";
        var queryLocationURL = "https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/search/geo/point?lat=" + lat + "&lng=" + lng + "&radius=" + radius + "&key=" + key + "";

        $.ajax({
            url: queryLocationURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.data);
            //looping thru results and adding to table
            var results = response.data;
            renderTable(results);
        });
    }

    //initiates breweryDB ajax by zipcode
    function ajaxByZip() {
        var key = "add62ea870e1bfdea1eee00e3594dbf5";
        var queryZipURL = "https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/locations?key=" + key + "&postalCode=" + zip + "";

        $.ajax({
            url: queryZipURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.data);

            //looping thru results and adding to table
            var results = response.data;
            zipLat = results[0].latitude;
            zipLng = results[0].longitude;
            initMapZip();
            renderTable(results);
        });
    }



    //--------------------- Front End--------------------------->

    // --------- carousel
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000); // Change image every 4 seconds
    }



    // ----------------------------------------------------->


    function displayTopMenu() {
        // Make Fixed menu appear by changing it's css...
        $('.top-menu').css('opacity', '1');
    };


    $('#location-button').on('click', function() {
        $('.main-container').html('');       
        // Run function createTable...
        displayTopMenu();
        createTable();
    });

    function createTable() {
        // Add Class and header to the Main Container...
        $('.main-container').addClass('row');
        $('.main-container').html('<h4 class="table-name">Search Results</h4>');
        // Create DIV that contains Table...
        var tableContainer = $('<div>').addClass('table-cont');
        // Create table add Class and Id attributes...
        var table = $('<table>').addClass('table');
        // Create table row...
        var row = $('<tr>');
        // Create Table Body...
        var tableBody = $('<tbody>');
        // Added id name...
        tableBody.attr('id', 'breweryList');
        // Text for table headers.
        var hedrs = ['Logo', 'Brewery Name', 'Address', 'Phone Number', 'Distance'];
        // Creates a TH tag for every item on the hedrs array...
        for (i = 0; i < hedrs.length; i++) {
            var tabHead = $('<th>').attr('scope', 'col');
            // Insert text to each tabHead...
            tabHead.text(hedrs[i]);
            // Insert TH to the TR element...
            row.append(tabHead);
        };
        // Insert Table Row to the table...
        table.append(row);
        // Insert Table to the Main Container...
        $(table).append(tableBody);
        $(tableContainer).append(table);
        $('.main-container').append(tableContainer);
    };
}); // Document Closing tag...

