var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Seeds = Promise.promisifyAll(mongoose.model('Seed'));
var Stories = Promise.promisifyAll(mongoose.model('Story'));
var Tweets = Promise.promisifyAll(mongoose.model('Tweet'));

var Async = Promise.promisifyAll(require('async'));

Router.get('/', function(req, res) {
  Seeds.find({
      associatedStoryIds: {
        $exists: true,
        $not: {
          $size: 0
        }
      }
    })
    .limit(20)
    .execAsync()
    .then(function(docs) {
      return Async.mapAsync(docs, function(item, callback) {
        var seed = {};
        seed.seed = item;
        Tweets.findById({
          _id: item.tweetId
        }, function(err, doc) {
          if (err) {
            callback(err);
          } else {
            seed.tweet = doc;
            Stories.find({
              _id: {
                $in: item.associatedStoryIds
              }
            }, function(err, doc) {
              if (err) {
                callback(err);
              } else {
                seed.stories = doc;
                callback(null, seed);
              }
            });
          }
        });
      });
    })
    .then(function(docs) {
      res.status(200).json(docs);
    })
    .catch(function(err) {
      console.log(err);
    });
});

Router.get('/:id', function(req, res) {

});

module.exports = Router;
