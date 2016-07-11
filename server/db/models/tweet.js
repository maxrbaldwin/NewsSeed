var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
    text: { type: String },
    tweetedBy: String,
    keywords: [],
    storyLink: { type: String, default: null },
    date: { type: Date, default: Date.now }
});

mongoose.model('Tweet', TweetSchema);
