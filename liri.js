var request = require('request');

var command = process.argv[2];
var userInput = process.argv[3];



switch(command){
    case 'my-tweets':
      myTweets();
    break;

    case 'spotify-this-song':
      spotifyThisSong();
    break;

    case 'movie-this':
      movieThis();
    break;

    case 'do-what-it-says':
      doWhatItSays();
    break;
}




function movieThis() {

var nodeArgs = process.argv;
var movieName = "";

for (var i=3; i<nodeArgs.length; i++){

	if (i>2 && i< nodeArgs.length){

		movieName = movieName + "+" + nodeArgs[i];

	}

	else {

		movieName = movieName + nodeArgs[i];
	}
}
var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';

// This line is just to help us debug against the actual URL.  
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

	if (!error && response.statusCode == 200) {

		console.log("==============================================");
		console.log("");
		console.log("Title: " + JSON.parse(body)["Title"]);
		console.log("");
		console.log("Release Year: " + JSON.parse(body)["Year"]);
		console.log("");
		console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
		console.log("");
		console.log("Country Filmed: " + JSON.parse(body)["Country"]);
		console.log("");
		console.log("Language: " + JSON.parse(body)["Language"]);
		console.log("");
		console.log("Plot Summary: " + JSON.parse(body)["Plot"]);
		console.log("");
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
		console.log("");
		console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		console.log("");
		console.log("==============================================");
	}
})
};



