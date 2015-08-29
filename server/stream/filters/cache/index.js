// Story, link is the key. Tweet is the next value it checks
var cache = {
  stories: {},
  check: function(storyLink, tweetToString) {
    // check for link as key.
    // then check for tweet in the key.
    // then maybe check tweeted by.
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
  delete: function(storyLink) {
    delete this.stories[storyLink];
  }
};

module.exports = cache;
