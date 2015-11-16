var chalk = require('chalk');
var Promise = require('bluebird');
var Twitter = require('twitter');
var path = require('path');

var seedFilter = require('./filters/seed');
var newsFilter = require('./filters/news');
var streamError = require('./error');

var env = require(path.join(__dirname, '../env'));

var client = new Twitter({
  consumer_key: env.STREAM.consumer_key,
  consumer_secret: env.STREAM.consumer_secret,
  access_token_key: env.STREAM.access_token_key,
  access_token_secret: env.STREAM.access_token_secret
});

var seedStreamParameters = {
  follow: env.getStreamIDs('seeds')
};

var newsStreamParameters = {
  follow: env.getStreamIDs('news')
};

client.stream('statuses/filter', seedStreamParameters, function(stream) {
  stream.on('data', seedFilter);
  stream.on('error', streamError);
});

client.stream('statuses/filter', newsStreamParameters, function(stream) {
  stream.on('data', newsFilter);
  stream.on('error', streamError);
});
