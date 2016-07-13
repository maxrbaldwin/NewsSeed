var Router = require('express').Router();
var mongoose = require('mongoose');
var Stream = mongoose.model('Stream');

Router.get('/', function (req, res) {
	var query = Stream.find({ twitterId: { $ne: null } }).limit(30);
		
	query.exec(function (err, streams){
		if(!err) {
			res.send(streams);
		}
	});
});

module.exports = Router;