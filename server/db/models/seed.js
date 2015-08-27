var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SeedSchema = new Schema({
  associatedStoryIds: [ObjectId],
  tweetId: ObjectId,
  link: String,
  date: { type: Date, default: Date.now },
  keywords: { type: [], default: [] } 
});

mongoose.model('Seed', SeedSchema);
