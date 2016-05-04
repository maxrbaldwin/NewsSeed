var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SourceSchema = new Schema({
	name: String,
	handle: String,
	contentBody: String,
	writtenBy: String,
	datePosted: String
});

mongoose.model('Source', SourceSchema);