//THE BEER LIST
//Project 1 122817

//--------------------- Front End--------------------------->

$(document).ready(function(){

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
