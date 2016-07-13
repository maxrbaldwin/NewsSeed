var mongoose = require('mongoose');

var Stream = mongoose.model('Stream');

var streamIDS = function() {
    var view = {
        initStream: function(key, callback) {
            var self = this;

            if (!this.streams) {
                Stream.find({}, function(err, response) {
                    self.streams = response;
                    callback(view.parseStreams(key, response));
                });
            } else {
                callback(view.parseStreams(key, response));
            }
        },
        parseStreams: function(key, stream) {
            var values = [];

            stream.forEach(function(el, i) {
                if (el[key]) {
                    values.push(el[key].toString());
                }
            });

            return values.toString();
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
        initStream: view.initStream,
        isTweetedByID: view.isTweetedByID
    }
}();

module.exports = streamIDS;
