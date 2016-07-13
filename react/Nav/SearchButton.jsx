var React = require('react');

var SearchButton = React.createClass({
	handleClick: function (e) {
		this.props.click(this.props.stateKey)
	},
	render: function () {
		return <button onClick={this.handleClick} stateKey={this.props.stateKey} className="ui button">{this.props.text}</button>
	}
});

module.exports = SearchButton;