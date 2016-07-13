var Reflux = require('reflux');
var request = require('request');
var Actions = require('./Actions.jsx');

var Store = Reflux.createStore({
	users: {
		url: 'http://localhost:5000/api/users/submit',
		action: this.submitUser,
		values: []
	},
	keywords: {
		url: 'http://localhost:5000/keywords/submit',
		action: this.submitKeywords,
		values: []
	},
	listenables: [Actions],
	handleButtonClick: function (key) {
		this[key].action()
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