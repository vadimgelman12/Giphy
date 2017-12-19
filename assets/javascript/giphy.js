$(document).ready(function() {


	var buttons = ["cats", "dogs", "hamsters", "goldfish","squirrels", "puppies", "kittens","turtles","ferrets","chipmunks"];



	makeButtons();


	// Function for making the buttons appear
	function makeButtons() {

		// clear the div
		$("#buttons-view").empty();

		// Looping through the array of movies
		for (var i = 0; i < buttons.length; i++) {

			// let's make some buttons!!
		  var newButton = $("<button>");
		  // Adding a class of movie to our button
		  newButton.addClass("animals");
		  // Adding a data-attribute
		  newButton.attr("data-name", buttons[i]);
		  // Providing the initial button text
		  newButton.text(buttons[i]);
		  // Adding the button to the buttons-view div
		  $("#buttons-view").append(newButton);
		}
	}

	// add a button click event
	//$("#add-button").on("click", function(event) {

    $(document.body).on("click", "#add-button", function(event) {		
		event.preventDefault();
		// get the text from textbox
		var button = $("#button-input").val().trim();

		// Adding movie from the textbox to our array
		buttons.push(button);

		// Calling renderButtons which handles the processing of our movie array
		makeButtons();

		// clear the text
		$('#button-input').val("");
	});   


	// click the image handler
    $(document.body).on("click", ".gif", function() {


        var state = $(this).attr("data-state");

        console.log(state);

        var still = $(this).attr("data-still");

        var animate = $(this).attr("data-animate");

        if (state ==="still") {
          $(this).attr("src",$(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        }else{
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state","still");
        };

     });	



	// add a button click event
    $(document.body).on("click", ".animals", function() {
		event.preventDefault();

        var picture = $(this).attr("data-name");

        //console.log(picture);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IBgmRfux9ojhvuXDRCHknigq2hzrGN3P&q=" + picture + "&limit=10&offset=0&rating=G&lang=en";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

			for (var i = 0; i < response.data.length; i++) {
    	

				// Creating a div to hold the movie
				var pictureDiv = $("<div class='picture'>");

				// Storing the rating data
				var rating = response.data[i].rating;

				// Creating an element to have the rating displayed
				var pRating = $("<p class='image-rating'>").text("Rating: " + rating);

				// Displaying the rating
				pictureDiv.append(pRating);


				// Retrieving the URL for the image
				var imgURL = response.data[i].images.fixed_width_still.url;

				// Creating an element to hold the image
				var image = $("<img>").attr("src", imgURL);

				// state
				$(image).attr("data-state", "still");       

				// class
				//$(image).addclass("gif");

				$(image).attr("class","gif");

				// animated
				$(image).attr("data-animate", response.data[i].images.fixed_width.url);    

				// still
				$(image).attr("data-still", response.data[i].images.fixed_width_still.url);                     

				// Appending the image
				pictureDiv.append(image);

				// Putting the data before previous pictures
				$("#pictures-div").prepend(pictureDiv);
			}
        });		


	});   	








});