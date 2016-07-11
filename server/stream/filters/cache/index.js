// Story, link is the key. Tweet is the next value it checks
var cache = {
  tweets: {},
  check: function(tweetId, tweetToString) {
    if(this.tweets[tweetId] && this.tweets[tweetId].tweet && this.tweets[tweetId].tweet === tweetToString) {
      return true;
    }

    return false;
  },
  set: function(tweetId, tweetToString) {
    this.tweets[tweetId] = {
      tweet: tweetToString
    };
  },
  delete: function(key, tweetId) {
    delete this[key][tweetId];
  }
};

module.exports = cache;
