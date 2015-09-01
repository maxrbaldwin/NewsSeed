// Story, link is the key. Tweet is the next value it checks
var cache = {
  stories: {},
  newStories: {},
  savedTweets: {},
  check: function(storyLink, tweetToString) {
    if(this.stories[storyLink] && this.stories[storyLink].tweet && this.stories[storyLink].tweet === tweetToString) {
      return true;
    }

    return false;
  },
  set: function(storyLink, tweetToString) {
    this.stories[storyLink] = {
      tweet: tweetToString
    };
  },
  delete: function(key, storyLink) {
    delete this[key][storyLink];
  }
};

module.exports = cache;
