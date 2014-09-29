// Batu Aytemiz -- Bored of the Dessert? Project.
var stop_word_list = "X q w e r t y u ı o p ğ a s d f g h j k l ş i z x c v b n m ö ç a able about above abst accordance according accordingly across act actually added adj affected affecting affects after afterwards again against ah all almost alone along already also although always am among amongst an and announce another any anybody anyhow anymore anyone anything anyway anyways anywhere apparently approximately are aren arent arise around as aside ask asking at auth available away awfully b back be became because become becomes becoming been before beforehand begin beginning beginnings begins behind being believe below beside besides between beyond biol both brief briefly but by c ca came can cannot can't cause causes certain certainly co com come comes contain containing contains could couldnt d date did didn't different do does doesn't doing done don't down downwards due during e each ed edu effect eg eight eighty either else elsewhere end ending enough especially et et-al etc even ever every everybody everyone everything everywhere ex except f far few ff fifth first five fix followed following follows for former formerly forth found four from further furthermore g gave get gets getting give given gives giving go goes gone got gotten h had happens hardly has hasn't have haven't having he hed hence her here hereafter hereby herein heres hereupon hers herself hes hi hid him himself his hither home how howbeit however hundred i id ie if i'll im immediate immediately importance important in inc indeed index information instead into invention inward is isn't it itd it'll its itself i've j just k keep    keeps kept kg km know known knows l largely last lately later latter latterly least less lest let lets like liked likely line little 'll look looking looks ltd m made mainly make makes many may maybe me mean means meantime meanwhile merely mg might million miss ml more moreover most mostly mr mrs much mug must my myself n na name namely nay nd near nearly necessarily necessary need needs neither never nevertheless new next nine ninety no nobody non none nonetheless noone nor normally nos not noted nothing now nowhere o obtain obtained obviously of off often oh ok okay old omitted on once one ones only onto or ord other others otherwise ought our ours ourselves out outside over overall owing own p page pages part particular particularly past per perhaps placed please plus poorly possible possibly potentially pp predominantly present previously primarily probably promptly proud provides put q que quickly quite qv r ran rather rd re readily really recent recently ref refs regarding regardless regards related relatively research respectively resulted resulting results right run s said same saw say saying says sec section see seeing seem seemed seeming seems seen self selves sent seven several shall she shed she'll shes should shouldn't show showed shown showns shows significant significantly similar similarly since six slightly so some somebody somehow someone somethan something sometime sometimes somewhat somewhere soon sorry specifically specified specify specifying still stop strongly sub substantially successfully such sufficiently suggest sup sure".split();


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// Here I am initlising the global variables that I am going to use;
var numberOfPictures = 100; // This defines the number of pictures to be pulled from reddit API. Max 100 Default 25.
var redditapi = "http://www.reddit.com/r/earthporn.json?limit=" + numberOfPictures;  // The url of the API
var number = 0; // iterator that will be used in the future
var wallpapers = []; // array that stores the wsallpapers
var json; // initlise the json variable. ? unnecesary.
var wait_time = 5000; // the wait time before each slide changes in miliseconds
var term = "earthporn";
var counter = 1;
var toggle = 0;
var wallpapernumber = 1;
var toggle = 0;



function searchWikipedia(){
	var subrdt = term;
	var wikiURL = "https://www.kimonolabs.com/api/5o4mcg8y?apikey=C6i17gKN77lllFG9h0UxaUpYwrTIWcZ2";
	var quoteObj;

	$.ajax({
		url: wikiURL,
		type: "GET",
		dataType: "jsonp",
		error: function(data,error){
			console.log(error);
			console.log("Something went wrong");
		},
		success: function(data){

			console.log("I AM HERE.");
			console.log(rawStr);
			quoteObj = data;
			var rawStr = data.results.collection1[0].quote;

			for (x = 0; x < rawStr.length-1; x++){
				if (rawStr[x] == "\\") {
					rawStr = rawStr.slice(0, x) + str.slice(x+1);
					rawStr = rawStr.slice(0, x) + str.slice(x+1);
				}
			}
			$("#container").empty();
			$("#theResults").empty();
			$("#theResults").append("<h1>" + rawStr + "</h1>");

		}
	});
}


// I see myself using it but I don't want to see the first element all the time. Might as well shuffle.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) 
{
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
	$(".centerise").fadeTo(550,0);
	$("#fullPage").fadeTo(800,1, function(crr){
		if (current !== null ){
			$('body').css('backgroundImage', "url("+current+")");
		}
	});
// I am hoping to make it wait untill the background change is done.

		$("body").ready(function(){
			$("#fullPage").delay(900).fadeTo(800,0);
		});
		wallpapernumber++;
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
		changePicture();
		changePicture();
		counter++;
	});
}

// the function that manages which link to go to when changing the pictures.
function changePicture(){
	// The first element of JSON file is not an url (or sometimes random entries). This is error checking.
	number = wallpapernumber;
	if (wallpapers[number] == null){
		console.log("true");
		// The div that appears. "enjoy the view?"
		$("#second").fadeTo(800,1);
		}else{
			var current = wallpapers[number + 1];
			// Here is the function that makes the fade in fade out background stuff.
			backgroundChange(current);
		}
		// iterates through the json object to grab the links? Why not just grab the preloaded urls? Commenting indeed helps you optimize stuff.

		//some links are not necesaryily image links but are links to places where the image is contained which results in a white screen. This line checks for those places.
		for (var i = 2; i < json["data"]["children"].length; i++) {
			if (!(json["data"]["children"][i]["data"]["url"].indexOf("www.flickr.com") > -1) && !(json["data"]["children"][i]["data"]["url"].indexOf("//imgur.com") > -1)){
				wallpapers.push(json["data"]["children"][i]["data"]["url"]);
			}
		}
	// The inital background change. Because using css is to mainstream.
	//wallpapers = shuffle(wallpapers);
	$('body').css('background-size', 'cover');
	searchWikipedia();
}

// The main function that kick starts the changePicture train.
function main(number){
	console.log(redditapi);
	$(document).ready(function(number){
		changePicture();
	});
}

// The get pictures starts the second window is open to make the loading faster.

// Why is my main function called in a function that is not main? Why not. This kickstarts the main process and calls main every "wait_time". 3,5 seconds right now.


$(document).ready(function(){
	$("#btn1").click(function(){
		term = "earthporn";
		redditapi = "http://www.reddit.com/r/earthporn.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn2").click(function(){
		term = "carporn";
		redditapi = "http://www.reddit.com/r/carporn.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn3").click(function(){
		term = "historyporn";
		redditapi = "http://www.reddit.com/r/historyporn.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn4").click(function(){
		term = "pics";
		redditapi = "http://www.reddit.com/r/pics.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn5").click(function(){
		term = "foodporn";
		redditapi = "http://www.reddit.com/r/foodporn.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn6").click(function(){
		term = "roomporn";
		redditapi = "http://www.reddit.com/r/roomporn.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn7").click(function(){
		term = "aww";
		redditapi = "http://www.reddit.com/r/aww.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#btn8").click(function(){
		term = "earthporn+carporn+historyporn+pics+foodporn+roomporn+aww";
		redditapi = "http://www.reddit.com/r/earthporn+carporn+historyporn+pics+foodporn+roomporn+aww.json?limit=" + numberOfPictures;
		getPictures();
		$(".button").fadeTo(550,0);
	});
	$("#bot-right").click(function(){
		$(".hidden").fadeTo(550,0);
		changePicture();
	});
	$("#bot-left").click(function(){
		if (toggle == 0){
			$(".hidden").fadeTo(550,1);
			toggle = 1;
		} else {
			$(".hidden").fadeTo(550,0);
			toggle = 0;
		}

	});
});




