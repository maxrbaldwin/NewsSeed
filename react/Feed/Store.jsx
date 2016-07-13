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
	getFeedByKey: function (listenTo) {
		request(this[listenTo].url, function(err, response, body) {
			if (!err) {
				this.triggerChange(listenTo, body)
			}
		});
	},
	triggerChange: function (key, data) {
		this[key].values = data;
		this.trigger('change', this[key].values);
	}
});

module.exports = Store;