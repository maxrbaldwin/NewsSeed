var commonFilters = {
  isRetweet: function(keywords) {
    if (keywords[0] === 'RT') {
      return keywords;
    }
    return false;
  },
  isAt: function(keyword) {
    return keyword.substring(0, 1) === '@';
  },
  isCapital: function(keyword) {
    return /[A-Z]/.test(keyword[0]);
  },
  filterKeywords: function(keywords) {
    // To get full proper nouns function(keywords, extendedKeyword)
    var newKeywords = [];
    var self = this;

    keywords.forEach(function(el, i) {
      if (el !== 'RT' && el !== 'BREAKING:' && !self.isAt(el)) {
        if(self.isCapital(el)) {
          newKeywords.push(self.getProperNoun(keywords, i, keywords[i]));
        } else if(el.length > 2){
          newKeywords.push(el);
        }
      }
    });

    return newKeywords;
  },
  testKeywords: function(filterKeywords, foundSeedKeywords) {
    var validKeywords = [];

    filterKeywords.forEach(function(el) {
      for (var i = 0; i < foundSeedKeywords.length; i++) {
        if (el === foundSeedKeywords[i]) {
          validKeywords.push(el);
        }
      }
    });

    return validKeywords.length > 10;
  },
  getTweetedBy: function(keywords) {
    var self = this;

    for (var i = 0; i < keywords.length; i++) {
      if (self.isAt(keywords[i])) {
        if (keywords[i].slice(-1) === ':') {
          return keywords[i].substring(0, keywords[i].length - 1).trim();
        }
      }
    }
  },
  getTweetLink: function(keywords) {
    // check if the link ends with ".." or "..."
    for (var i = 0; i < keywords.length; i++) {
      if (keywords[i].substring(0, 7) === 'http://') {
        return keywords[i].trim();
      }
    }
  },
  getMetaDescription: function(meta) {
    var keys = Object.keys(meta);

    for (var i = 0; i < keys.length; i++) {
      if (meta[i] && meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'description') {
        return meta[i].attribs.content.trim();
      } else if (meta[i] && meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'og:description') {
        return meta[i].attribs.content.trim();
      } else if (meta[i] && meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'twitter:description') {
        return meta[i].attribs.content.trim();
      }
    }

    return;
  },
  getMetaImage: function(meta) {
    var keys = Object.keys(meta);

    for (var i = 0; i < keys.length; i++) {
      if (meta[i] && meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'og:image') {
        return meta[i].attribs.content.trim();
      } else if (meta[i] && meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'twitter:image:src') {
        return meta[i].attribs.content.trim();
      }
    }

    return;
  },
  getProperNoun: function(keywords, i, properNoun) {
    // if(this.isCapital(keywords[i + 1])) {
    //   this.getProperNoun(keywords, i + 1, properNoun.contcat(keywords[i + 1]));
    // }
  }
};

module.exports = commonFilters;
