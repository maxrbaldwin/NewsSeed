var commonFilters = {
  isRetweet: function(keywords) {
    if(keywords[0] === 'RT') {
      return keywords;
    }
    return false;
  },
  filterKeywords: function(keywords) {
    /**
    * If a word's length is <= 2 and doesn't start with a capital letter
    **/
    var removeRT = keywords.shift();

    return keywords;
  },
  getTweetedBy: function(keywords) {
    for(var i=0; i < keywords.length; i++) {
      if(keywords[i].substring(0, 1) === '@') {
        if(keywords[i].slice(-1) === ':') {
          return keywords[i].substring(0, keywords[i].length - 1);
        }
      }
    }
  },
  getTweetLink: function(keywords) {
    for(var i=0; i < keywords.length; i++) {
      if(keywords[i].substring(0, 7) === 'http://') {
        return keywords[i];
      }
    }
  }
 };

module.exports = commonFilters;
