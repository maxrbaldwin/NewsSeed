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
        // @TODO: Make an array of keywords that I don't want ex "or" do it in a file like cache.
        keywords.forEach(function(el, i) {
            if (el !== 'RT' && el !== 'BREAKING:' && !self.isAt(el)) {
                if (self.isCapital(el)) {
                    // newKeywords.push(self.getProperNoun(keywords, i, keywords[i]));
                    newKeywords.push(el);
                } else if (el.length > 2) {
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
    getTweetedBy: function(tweet) {
        return tweet.user.id;
    },
    getTweetLink: function(keywords) {
        // @TODO: check if the link ends with ".." or "..."
        for (var i = 0; i < keywords.length; i++) {
            if (keywords[i].substring(0, 7) === 'http://' || keywords[i].substring(0, 8) === 'https://') {
                return keywords[i].trim();
            }
        }
    }
};

module.exports = commonFilters;
