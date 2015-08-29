var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var commonFilters = require('./common');
var cache = require('./cache');

var Seed = Promise.promisifyAll(mongoose.model('Seed'));
var Tweet = Promise.promisifyAll(mongoose.model('Tweet'));

var seedFilter = function(tweet) {
  var filterKeywords, tweetedBy, storyLink;

  var tweetToString = String(tweet.text);
  var keywords = tweetToString.split(' ');

  if (commonFilters.isRetweet(keywords)) {
    filterKeywords = commonFilters.filterKeywords(keywords);
    tweetedBy = commonFilters.getTweetedBy(keywords);
    storyLink = commonFilters.getTweetLink(keywords);
  } else {
    return;
  }

  if (!cache.check(storyLink, tweetToString)) {
    cache.set(storyLink, tweetToString);

    Tweet.createAsync({
        text: tweetToString,
        tweetedBy: tweetedBy
      })
      .then(function(doc) {
        if (doc && filterKeywords) {
          this.savedTweet = doc;

          return Seed.findAsync({
            keywords: {
              $in: filterKeywords
            }
          });
        }
      })
      .then(function(docs) {
        var newSeed = {
          associatedStoryIds: [],
          tweetId: this.savedTweet._id,
          tweet: tweetToString,
          link: storyLink,
          keywords: filterKeywords
        };
        console.log(docs);

        if(docs && docs.length === 0) {
          return Seed.createAsync(newSeed);
        } else if(docs.length > 0 && !commonFilters.testKeywords(filterKeywords, docs[0].keywords)) {
          return Seed.createAsync(newSeed);
        }
      })
      .then(function(doc) {
        if (doc) {
          console.log(chalk.green('New Seed: ' + tweetToString));
        } else {
          console.log(chalk.gray('Old Seed: ' + tweetToString));
        }
        cache.delete(storyLink);
      })
      .catch(function(err) {
        console.log(chalk.red(err));
      });
  }

};

module.exports = seedFilter;
