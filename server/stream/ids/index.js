var mongoose = require('mongoose');

var Stream = mongoose.model('Stream');

var streamIDS = function() {
    var view = {
        fetchStreamIds: function(callback) {
            var self = this;

            Stream.find({}, function(err, response) {
                self.streams = response;
                callback(view.parseIds(response));
            });
        },
        parseIds: function(streams) {
            var ids = [];

            streams.forEach(function(el, i) {
                ids.push(el.twitterId);
            });

            return ids.toString();
        },
        isTweetedByID: function(id) {
            var ids = this.streams.filter(function(el, i) {
                if (el.twitterId === id) {
                    return el;
                }
            });

            return (ids.length) ? true : false
        }
    }

    return {
        fetchStreamIds: view.fetchStreamIds,
        isTweetedByID: view.isTweetedByID
    }
}();

module.exports = streamIDS;
