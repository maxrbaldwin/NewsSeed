var React = require('react');
var request = require('request');

var getRequest = 'http://localhost:5000/api/seeds/recent';

var feed = React.createClass({
	getInitialState: function () {
		return {
			results: []
		}
	},
	componentDidMount: function () {
		var self = this;

		request.get(getRequest, function(err, response, body) {
			self.setState({
				results: JSON.parse(body)
			});
		});
	},
	renderFeed: function () {
		var feedChildren = [];

		this.state.results.forEach(function (el, i) {
			if(el.tweetId) {
				feedChildren.push(
					<div className="tweet">
						<p>{el.tweetId.text}</p>
					</div>
				)
			}
		});

		return feedChildren
	},
	render: function () {
		return(
			<div className="feed-body">
				{this.renderFeed()}
			</div>
		)
	}
});

module.exports = feed;