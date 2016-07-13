var React = require('react');
var Reflux = require('reflux');
var Store = require('./Store.jsx');
var Actions = require('./Actions.jsx');

var Feed = React.createClass({
	mixins: [Reflux.listenTo(Store, 'onChange')],
	getInitalState: function () {
		return {
			values: []
		}
	},
	componentWillMount: function () {
		// Onchange is listening
		//Actions.getFeedByKey(this.props.listenTo)
	},
	onChange: function(event, values) {
		// listens from componentWillMount
		this.setState({ values: values })
	},
	renderValues: function () {
		return this.state.values.map(function(value) {
			return <li>
				{value}
			</li>
		});
	},
	render: function() {
		return <div className={"feed " + this.props.classes}>
			{ this.renderValues }
		</div>
	}
});

module.exports = Feed;