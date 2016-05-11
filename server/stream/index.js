var chalk = require('chalk');
var Twitter = require('twitter');
var env = require('dotenv').config();

var seedFilter = require('./filters/seed');
var newsFilter = require('./filters/news');
var streamError = require('./error');
var streamIDs = require('./ids');

var client = new Twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret
});

var seedStreamParameters = {
  follow: streamIDs.getStreamIDs('seeds')
};

var newsStreamParameters = {
  follow: streamIDs.getStreamIDs('news')
};

client.stream('statuses/filter', seedStreamParameters, function(stream) {
  stream.on('data', seedFilter);
  stream.on('error', streamError);
});

client.stream('statuses/filter', newsStreamParameters, function(stream) {
  stream.on('data', newsFilter);
  stream.on('error', streamError);
});
