var Router = require('express').Router();
var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');

Router.get('/', function (req, res) {
	var query = Tweet.find({ text: { $ne: null } }).sort({date: -1}).limit(30);
		
	query.exec(function (err, tweets){
		if(!err) {
			res.send(tweets);
		}
	});
});

module.exports = Router;