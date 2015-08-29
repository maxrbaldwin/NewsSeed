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
          return keywords[i].substring(0, keywords[i].length - 1).trim();
        }
      }
    }
  },
  getTweetLink: function(keywords) {
    // check if the link ends with ".." or "..."
    for(var i=0; i < keywords.length; i++) {
      if(keywords[i].substring(0, 7) === 'http://') {
        return keywords[i].trim();
      }
    }
  },
  getMetaDescription: function(meta) {
    var keys = Object.keys(meta);

    for(var i=0; i < keys.length; i++) {
      if(meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'description') {
        return meta[i].attribs.content.trim();
      } else if(meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'og:description') {
        return meta[i].attribs.content.trim();
      } else if(meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'twitter:description') {
        return meta[i].attribs.content.trim();
      }
    }

    return;
  },
  getMetaImage: function(meta) {
    var keys = Object.keys(meta);

    for(var i=0; i < keys.length; i++) {
      if(meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'og:image') {
        return meta[i].attribs.content.trim();
      } else if(meta[i].attribs && meta[i].attribs.name && meta[i].attribs.name === 'twitter:image:src') {
        return meta[i].attribs.content.trim();
      }
    }

    return;
  }
 };

module.exports = commonFilters;
