var Twitter = require('twitter');
var env = require('dotenv').config();

var newsFilter = require('./filters/news');
var streamError = require('./error');
var streamIDs = require('./ids');

var client = new Twitter({
    consumer_key: env.consumer_key,
    consumer_secret: env.consumer_secret,
    access_token_key: env.access_token_key,
    access_token_secret: env.access_token_secret
});


streamIDs.initStream('twitterId', function(ids) {
    var newsStreamParameters = {
        follow: ids
    };

    client.stream('statuses/filter', newsStreamParameters, function(stream) {
        stream.on('data', newsFilter);
        stream.on('error', streamError);
    });
});
