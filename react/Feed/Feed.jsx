var React = require('react');
var Reflux = require('reflux');

var Store = require('./Store.jsx');
var Actions = require('./Actions.jsx');
var NavStore = require('./../Nav/Store.jsx')

var Feed = React.createClass({
	mixins: [
		Reflux.listenTo(Store, 'handleStoreResponse'),
		Reflux.listenTo(NavStore, 'handleButtonClick')
	],
	getInitialState: function () {
		return {
			key: this.props.initialKey,
			users: {
				values: []
			},
			keywords: {
				values: []
			},
		}
	},
	componentDidMount: function () {
		// Onchange is listening
		Actions.getFeedByKey(this.state.key);
	},
	handleStoreResponse: function(event, data) {
		// listens from componentWillMount
		this.setState(data)
	},
	handleButtonClick: function (event, data) {
		this.setState({key: data});
	},
	renderValues: function (key) {
		if(this.state[key].values.length) {
			return this.state[key].values.map(function(value, i) {
				return <div className="tweet" key={i}>
					<div className="tweetedBy">{value.tweetedBy}</div>
					<a target="_blank" href={value.storyLink} className="tweetedText">{value.text}</a>
				</div>
			});
		} else {
			return <div>No values</div>
		}
	},
	render: function() {
		return <div className={'feed ' + this.state.key}>
			{ this.renderValues(this.state.key) }
		</div>
	}
});

module.exports = Feed;