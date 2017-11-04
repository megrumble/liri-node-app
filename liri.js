var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
var spotify = require("node-spotify-api");


//twitter function
function myTweets() {
    var twitterKeys = require('./keys.js');
    var Twitter = require('twitter');
    var client = new Twitter({
        // consumer_key: twitterKeys.consumer_key,
        // consumer_secret: twitterKeys.consumer_secret,
        // access_token_key: twitterKeys.access_token_key,
        // access_token_secret: twitterKeys.access_token_secret
        consumer_key: 'fIUCbjPenAs9hhw2ajQu6D7id',
        consumer_secret: '8jfKltb0HUO0WCqZx8NftaLJCrsY3AmRVZ0yjnLP3LdwNI8Y4u',
        access_token_key: '	926079074677743616-eNosvk1JkCPbh5DqPQbm0MU6yZOMgX2',
        access_token_secret: 'WglG8Sz9TWUStmoVVck4Gndv1aJD1RLGYpSqLmWNRQIKn',
    });

    var params = {
        screen_name: "Meg_Rum",
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("tweets");
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet # " + (i + 1) + ": " + tweets[i].text);
                console.log("--------------------");
                console.log("Created at: " + tweets[i].created_at);
                console.log("--------------------");
            };
        };

    });
};

//command line args
var command = process.argv[2];
var command2 = process.argv[3];
if (command === "myTweets") {
    console.log("myTweets");
    myTweets();
} else if (command === "spotifyMe") {
    console.log("spotifyMe");
    spotifyMe();
} else if (command === "movieThis") {
    console.log("movie time!");
    movieThis();
}

//spotify function
function spotifyMe() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: '91e7ff484df54cfe983720294e885613',
        secret: '51ecac14b9a74d81899ba78eb40a0998'
    });
    //    client_id: '91e7ff484df54cfe983720294e885613',
    //     client_secret: '51ecac14b9a74d81899ba78eb40a0998'

    var queryTrack;
    if (command2 === undefined) {
        queryTrack = "The Sign"
    } else {
        queryTrack = command2;
    }
    spotify.search({
        type: 'track',
        query: queryTrack
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }
    });
}
// movies search function
function movieThis() {
    var request = require("request");
    console.log('Movie time!');
    var myMovie;
    if (command2 === undefined) {
        myMovie = "Mr. Nobody";
    } else {
        myMovie = command2;
    };

    var url = 'http://www.omdbapi.com/?t=' + myMovie + '&y=&plot=long&tomatoes=true&r=json';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);


        }
    });
};