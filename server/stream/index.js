var chalk = require('chalk');
var Promise = require('bluebird');
var Twitter = require('twitter');
var path = require('path');

var tweetFilter = require('./filter');
var streamError = require('./error');

var env = require(path.join(__dirname, '../env'));

var client = new Twitter({
  consumer_key: env.STREAM.consumer_key,
  consumer_secret: env.STREAM.consumer_secret,
  access_token_key: env.STREAM.access_token_key,
  access_token_secret: env.STREAM.access_token_secret
});

var streamParameters = {
  follow: env.STREAM_IDS.AP
};

client.stream('statuses/filter', streamParameters, function(stream) {
  stream.on('data', tweetFilter);
  stream.on('error', streamError);
});
