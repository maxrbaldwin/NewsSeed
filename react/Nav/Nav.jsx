var React = require('react');
var Reflux = require('reflux');

var Store = require('./Store.jsx');
var Actions = require('./Actions.jsx');
var FeedActions = require('./../Feed/Actions.jsx');
// Child components
var SearchButton = require('./SearchButton.jsx');

var Nav = React.createClass({
	getInitialState: function () {
		return {
			key: this.props.initialKey,
			input: '',
		}
	},
	handleChange: function (e) {
		this.setState({input: e.target.value});
	},
	handleButtonClick: function (key) {
		this.setState({key: key});
		Actions.buttonClicked(key);
	},
	handleAddClicked: function (e) {
		var input = this.state.input;

		if(input.length) {
			FeedActions.submitStream(this.state.key, input);
		}
	},
	render: function () {
		return <div className="nav">
			<div className="ui transparent icon fluid input">
  				<input onChange={this.handleChange} type="text" placeholder="Add keywords or a Twitter handle" />
  				<a href="#" onClick={this.handleAddClicked}>
  					<i className="plus square outline icon"></i>
  				</a>
			</div>
			<div className="clear"></div>
			<div className="ui buttons">
  				<SearchButton click={this.handleButtonClick} stateKey="keywords" text="Keywords" />
  				<div className="or"></div>
  				<SearchButton click={this.handleButtonClick} stateKey="users" text="Twitter Handle" />
			</div>
		</div>
	}
});

module.exports = Nav;