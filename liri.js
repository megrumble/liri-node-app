var twitterKeys = require('./keys');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
var spotify = require("node-spotify-api");

function myTweets() {
    var client = new Twitter(keys.twitterKeys);

    var params = {
        screen_name: 'Meg_Rum',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet # " + (i + 1) + ": " + tweets[i].text);
                console.log("--------------------");
                console.log("Created at: " + tweets[i].created_at);
                console.log("--------------------");
            };
        };

    });
};

var commandType = process.argv[2];