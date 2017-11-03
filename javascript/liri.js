var twitterKeys = require('./keys');
var Twitter = require('twitter');

var client = new Twitter(twitterKeys);

var params = {
    screen_name: 'nodejs'
};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

var commandType = process.argv[2];