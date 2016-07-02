var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var fs = require('fs');
var key = require('./keys.js')

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

function myTweets(){
	var twitter = new Twitter(key.twitterKeys)
	var params = {screen_name: 'KaylaLudmila'};
	twitter.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	for (var i = 0; i<tweets.length; i++){
	  	console.log(tweets[i].text);
	  	console.log(tweets[i].user.created_at);
			}
		}
	});
}	



function spotifyThisSong(songTitle) {

var nodeArgs = process.argv;


if (songTitle	=== undefined) {
	var songTitle = "";

	if (nodeArgs.length<=3 ){
		songTitle = "what's my age again"
	}else{
		for (var i=3; i<nodeArgs.length; i++){

			if (i>3 && i< nodeArgs.length){

				songTitle = songTitle + "+" + nodeArgs[i];
			}
			else {
				songTitle = songTitle + nodeArgs[i];
			}
		}
	}
}


console.log('song: '+songTitle);
spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 		console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album Title: " + data.tracks.items[0].album.name);
});
}


function movieThis() {

var nodeArgs = process.argv;
var movieName = "";



if (nodeArgs.length<=3 ){
		movieName = "Mr.Nobody"
	}else{
		for (var i=3; i<nodeArgs.length; i++){

			if (i>3 && i< nodeArgs.length){

				movieName = movieName + "+" + nodeArgs[i];
			}
			else {
					movieName = movieName + nodeArgs[i];
			}
		}
	}

var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';

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

function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(err, data){

        var input = data.split(',');
				 command = input[0];
				 song = input[1];
         console.log('command'+command);

					switch(command){
				    case 'my-tweets':
				      myTweets();
				    break;

				    case 'spotify-this-song':
				      spotifyThisSong(song);
				    break;

				    case 'movie-this':
				      movieThis();
				    break;
				}
			});	

    };

