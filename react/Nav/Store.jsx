// Nav store
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
	buttonClicked: function (key, input) {
		this.triggerClick('click', key)
	},
	triggerClick: function (event, key) {
		this.trigger(event, key);
	},
});

module.exports = Store;