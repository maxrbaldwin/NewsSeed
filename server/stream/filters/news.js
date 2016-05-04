var events = require('events');
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request').defaults({
    maxRedirects: 100
});

events.EventEmitter.prototype._maxListeners = 100;

var commonFilters = require('./common');
var cache = require('./cache');
var emitter = require('./../../emitter');

var Story = Promise.promisifyAll(mongoose.model('Story'));
var Tweet = Promise.promisifyAll(mongoose.model('Tweet'));
var Seed = Promise.promisifyAll(mongoose.model('Seed'));
var Source = Promise.promisifyAll(mongoose.model('Source'));
var Request = Promise.promisifyAll(request);

var newsFilter = function(tweet) {
    var filterKeywords, tweetedBy, storyLink, newSeed, $;

    // @TODO: Dont use the String constuctor
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

        Tweet.findAsync({
                text: tweetToString
            })
            .then(function(docs) {
                if (docs && docs.length === 0) {
                    return Tweet.createAsync({
                        text: tweetToString,
                        tweetedBy: tweetedBy,
                        keywords: filterKeywords
                    });
                }
            })
            .then(function(doc) {
                if (doc) {
                    console.log(chalk.cyan('Story Tweet Created: ' + tweetToString));
                    emitter.emit('tweet', doc);
                } else {
                    console.log(chalk.gray('Old Story Tweeet: ' + tweetToString));
                }

                if (doc && storyLink) {
                    cache.newStories[storyLink] = {
                        tweetedId: doc._id,
                        link: storyLink,
                        keywords: filterKeywords
                    };
                    return Source.findOneAsync({
                        handle: tweetedBy
                    });
                }
            })
            .then(function(doc) {
                if(doc) {
                    cache.newStories[storyLink].scrapeMap = doc
                }

                return Request.headAsync(storyLink, {
                    followAllRedirects: true,
                });
            })
            .then(function(response) {
                if (response) {
                    return Request.getAsync(response[0].request.href, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36"
                        }
                    });
                }
            })
            .then(function(response) {
                if (response && response[0].statusCode === 200) {
                    $ = cheerio.load(response[0].body);
                    cache.newStories[storyLink].title = $('head title').text();
                    cache.newStories[storyLink].description = commonFilters.getMetaDescription($('meta'));
                    cache.newStories[storyLink].img = commonFilters.getMetaImage($('meta'));

                    if(cache.newStories[storyLink].scrapeMap) {
                        cache.newStories[storyLink].content = $(cache.newStories[storyLink].scrapeMap.contentBody + ' p').text();
                    }

                    if (filterKeywords) {
                        return Seed.findAsync({
                            keywords: {
                                $in: filterKeywords
                            }
                        });
                    }
                }
            })
            .then(function(doc) {
                if (doc && doc.length) {
                    cache.newStories[storyLink].seedID = doc[0]._id;
                    cache.newStories[storyLink].planted = true;
                }

                if (cache.newStories[storyLink]) {
                    return Story.createAsync(cache.newStories[storyLink]);
                }
            })
            .then(function(doc) {
                if (doc) {
                    console.log(chalk.white('New Story: ' + tweetToString));
                    emitter.emit('news', doc);
                }

                if (doc && cache.newStories[storyLink].planted) {
                    return Seed.findOneAndUpdateAsync({
                        _id: cache.newStories[storyLink].seedID
                    }, {
                        $push: {
                            associatedStoryIds: doc._id
                        }
                    }, {
                        safe: true,
                        upsert: true
                    });
                } else {
                    cache.delete('newStories', storyLink);
                }
            })
            .then(function(doc) {
                cache.delete('newStories', storyLink);
            })
            .catch(function(err) {
                console.log(chalk.red(err));
                cache.delete('newStories', storyLink);
            });
    }
};

module.exports = newsFilter;
