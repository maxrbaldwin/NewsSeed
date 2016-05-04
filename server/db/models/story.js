var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StorySchema = new Schema({
  seedID: ObjectId,
  tweetedId: ObjectId,
  title: String,
  link: String,
  img: String,
  description: String,
  content: String,
  date: { type: Date, default: Date.now },
  keywords: [],
  planted: { type: Boolean, default: false }
});

mongoose.model('Story', StorySchema);
