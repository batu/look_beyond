// Batu Aytemiz -- Bored of the Dessert? Project.

// Here I am initlising the global variables that I am going to use;
var numberOfPictures = 100; // This defines the number of pictures to be pulled from reddit API. Max 100 Default 25.
var redditapi = "http://www.reddit.com/r/earthporn.json?limit=" + numberOfPictures;  // The url of the API
var number = 0; // iterator that will be used in the future
var wallpapers = []; // array that stores the wallpapers
var json; // initlise the json variable. ? unnecesary.
var wait_time = 3500; // the wait time before each slide changes in miliseconds

// I see myself using it but I don't want to see the first element all the time. Might as well shuffle.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//The function that facilitates the fade in fade out of the black screen, helps overcome the white screen flashing.
function backgroundChange(crr){
	var current = crr;
	// This is the div that vanishes "Tired of the desert?"
	$("#first").fadeTo(550,0);
	$("#fullPage").fadeTo(800,1, function(crr){
		if (current !== null ){
			$('body').css('backgroundImage', "url("+current+")");
		}
	});
// I am hoping to make it wait untill the background change is done.
		$("body").ready(function(){
			$("#fullPage").fadeTo(800,0);
		});
}

// This function grabs the picture urls from the subreddit Earthporn.
function getPictures(){
	//The ajax call is made using jquery. We are getting them in JSON format.
	$.getJSON(redditapi, function(data) {
		json = data;
		//by creating Image object and giving them the link I am downloading the pictures and JS is cacheing them for later use. 
		wallpaperPreload = [];
		for (var j = 0; j < json["data"]["children"].length; j++) {
			wallpaperPreload[j] = new Image();
			wallpaperPreload[j] = json["data"]["children"][j]["data"]["url"];
		}
	});
}

// the function that manages which link to go to when changing the pictures.
function changePicture(){
	// The first element of JSON file is not an url (or sometimes random entries). This is error checking.
	
	if (wallpapers[number] == null){
		console.log("true");
		// The div that appears. "enjoy the view?"
		$("#second").fadeTo(800,1);
		}else{
			var current = wallpapers[number];
			// Here is the function that makes the fade in fade out background stuff.
			backgroundChange(current);
		}
		// iterates through the json object to grab the links? Why not just grab the preloaded urls? Commenting indeed helps you optimize stuff.

		//some links are not necesaryily image links but are links to places where the image is contained which results in a white screen. This line checks for those places.
		for (var i = 1; i < json["data"]["children"].length; i++) {
			if (!(json["data"]["children"][i]["data"]["url"].indexOf("www.flickr.com") > -1) && !(json["data"]["children"][i]["data"]["url"].indexOf("//imgur.com") > -1)){
				wallpapers.push(json["data"]["children"][i]["data"]["url"]);
			}
		}
	// The inital background change. Because using css is to mainstream.
	//wallpapers = shuffle(wallpapers);
	$('body').css('background-size', 'cover');
}

// The main function that kick starts the changePicture train.
function main(number){
	$(document).ready(function(number) {
		changePicture();
	});
}

// The get pictures starts the second window is open to make the loading faster.
$(window).load(function () {
	getPictures();
});

// Why is my main function called in a function that is not main? Why not. This kickstarts the main process and calls main every "wait_time". 3,5 seconds right now.

setInterval(function(){main(number); number += 1;}, wait_time);



