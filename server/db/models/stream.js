var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StreamSchema = new Schema({
	name: String,
	twitterId: { type: Number, default: null },
	keywords: { type: [], default: null },
	date: { type: Date, default: Date.now() }
});

mongoose.model('Stream', StreamSchema);