var events = require('events');
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var commonFilters = require('./common');
var cache = require('./cache');
var streamIDs = require('./../ids');

var Tweet = Promise.promisifyAll(mongoose.model('Tweet'));

var newsFilter = function(tweet) {
    var filterKeywords, tweetedBy, storyLink, newSeed, $;

    // @TODO: Dont use the String constuctor
    var tweetToString = String(tweet.text);
    var keywords = tweetToString.split(' ');
    var tweetId = tweet.id;

    console.log('New Tweet: ' + tweetToString);

    if (streamIDs.isTweetedByID(tweet.user.id)) {
        filterKeywords = commonFilters.filterKeywords(keywords);
        storyLink = commonFilters.getTweetLink(keywords);
        tweetedBy = commonFilters.getTweetedBy(tweet);
    } else {
        return;
    }

    if (!cache.check(tweetId, tweetToString)) {
        cache.set(tweetId, tweetToString);

        Tweet.findAsync({
                text: tweetToString
            })
            .then(function(docs) {
                if (docs && docs.length === 0) {
                    return Tweet.createAsync({
                        text: tweetToString,
                        tweetedBy: tweetedBy,
                        keywords: filterKeywords,
                        storyLink: storyLink
                    });
                }
            })
            .then(function(doc) {
                if (doc) {
                    console.log(chalk.cyan('Story Tweet Created: ' + tweetToString));
                } else {
                    console.log(chalk.gray('Old Story Tweeet: ' + tweetToString));
                }

                cache.delete('tweets', tweetId);
            })
            .catch(function(err) {
                console.log(chalk.red(err));
                cache.delete('tweets', tweetId);
            });
    }
};

module.exports = newsFilter;
