var Router = require('express').Router();
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Seed = mongoose.model('Seed');

Router.get('/recent', function (req, res) {
	Seed.find()
		.populate(['associatedStoryIds', 'tweetId'])
		.limit(30)
		.exec(function(err, docs){
			res.send(docs);
		});
});

module.exports = Router;