var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TrendingSchema = new Schema({
	tweetedId: ObjectId,
});

mongoose.model('Trending', TrendingSchema);