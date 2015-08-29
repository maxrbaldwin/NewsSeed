require('events').EventEmitter.prototype._maxListeners = 100;
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request').defaults({ maxRedirects:100 });

var commonFilters = require('./common');

var Story = Promise.promisifyAll(mongoose.model('Story'));
var Tweet = Promise.promisifyAll(mongoose.model('Tweet'));
var Seed = Promise.promisifyAll(mongoose.model('Seed'));
var Request = Promise.promisifyAll(request);

var newsFilter = function(tweet) {
  var filterKeywords, tweetedBy, storyLink, newSeed, $;

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
        tweetedBy: tweetedBy,
        keywords: filterKeywords
      });
    }
    console.log(chalk.gray('Old Tweet: ' + tweetToString));
    return;
  })
  .then(function(doc){
    if(doc && storyLink) {
      this.savedTweet = doc;
      this.newStory = {
        tweetedId: doc._id,
        link: storyLink,
        keywords: filterKeywords
      };

      return Request.headAsync(storyLink, {
        followAllRedirects: true,
      });
    }

    return;
  })
  .then(function(response){
    if(response) {
      return Request.getAsync(response[0].request.href, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36"
        }
      });
    }
    return;
  })
  .then(function(response){
    if(response && response[0].statusCode === 200) {
      $ = cheerio.load(response[0].body);
      this.newStory.title = $('head title').text();
      this.newStory.description = commonFilters.getMetaDescription($('meta'));
      this.newStory.img = commonFilters.getMetaImage($('meta'));

      if(filterKeywords) {
        return Seed.findAsync({ keywords: { $in: filterKeywords } });
      }
    }
    return;
  })
  .then(function(doc){
    if(doc) {
      this.newStory.seedID = doc[0]._id;
      this.newStory.planted = true;
    }

    if(this.newStory) {
      return Story.createAsync(this.newStory);
    }

    return;
  })
  .then(function(doc){
    if(doc) {
      console.log(chalk.cyan('******** Story added ********'));
      console.log(chalk.cyan(doc));
    }

    return;
  })
  .catch(function(err){
    console.log(chalk.red(err));
  });
};

module.exports = newsFilter;
