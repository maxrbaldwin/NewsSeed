// Feed store
var Reflux = require('reflux');
var request = require('request');
var Actions = require('./Actions.jsx');

var Store = Reflux.createStore({
	users: {
		url: 'http://localhost:5000/api/users',
		values: []
	},
	keywords: {
		url: 'http://localhost:5000/api/keywords',
		values: []
	},
	settings: {
		maxPages: 5,
	},
	listenables: [Actions],
	getFeedByKey: function (key) {
		var self = this;

		request(this[key].url, function(err, response, body) {
			if (!err) {
				self.triggerChange(key, JSON.parse(body))
			}
		});
	},
	submitStream: function (key, input) {
		request(this[key].url + '/submit?stream=' + input, function(err, response, body) {
			if(!err) {
				console.log('body')
			}
		})
	},
	triggerChange: function (key, body) {
		var data = {
			key: key
		}

		data[key] = {};
		data[key].values = body;

		this[key].values = body;
		this.trigger('change', data);
	}
});

module.exports = Store;