var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var commonFilters = require('./common');

var Seed = Promise.promisifyAll(mongoose.model('Seed'));
var Tweet = Promise.promisifyAll(mongoose.model('Tweet'));

var seedFilter = function (tweet) {
  var filterKeywords, tweetedBy, storyLink, newSeed;

  var tweetToString = String(tweet.text);
  var keywords = tweetToString.split(' ');

  if(commonFilters.isRetweet(keywords)) {
    filterKeywords = commonFilters.filterKeywords(keywords);
    tweetedBy = commonFilters.getTweetedBy(keywords);
    storyLink = commonFilters.getTweetLink(keywords);
  } else {
    return;
  }

  Tweet.findAsync({ text: tweetToString })
  .then(function(doc){
    if(doc.length === 0 && tweetedBy) {
      return Tweet.createAsync({
        text: tweetToString,
        tweetedBy: tweetedBy
      });
    }
    return;
  })
  .then(function(doc){
    if(doc && filterKeywords) {
      this.savedTweet = doc;

      return Seed.findAsync({ keywords: { $in: filterKeywords } });
    }
    return;
  })
  .then(function(docs){
    if(docs && docs.length === 0) {
      newSeed = {
        associatedStoryIds: [],
        tweetId: this.savedTweet._id,
        tweet: tweetToString,
        link: storyLink,
        keywords: filterKeywords
      };
      return Seed.createAsync(newSeed);
    }
    return;
  })
  .then(function(doc){
    if(doc) {
      console.log(chalk.green('New Seed: ' + tweetToString));
    } else {
      console.log(chalk.cyan('Old Seed: ' + tweetToString));
    }
  })
  .catch(function(err){
    console.log(chalk.red(err));
  });

};

module.exports = seedFilter;
