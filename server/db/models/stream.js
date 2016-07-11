var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StreamSchema = new Schema({
	name: String,
	twitterId: Number
});

mongoose.model('Stream', StreamSchema);