var request = require('request');


var Twitter = function () {
	var view = {
		search: function (keywords) {
			var encodedKeywords = encodeURIComponent(keywords)
			var options: {
				method: 'GET',
				uri: 'https://api.twitter.com/1.1/search/tweets.json?q=' + encodedKeywords,
				headers: {
					
				}
			}
	}

	return {

	}
}();

module.exports = Twitter;