var React = require('react');

var Store = require('./Store.jsx');
var Actions = require('./Actions.jsx');
// Child components
var SearchButton = require('./SearchButton.jsx');

var AddTo = React.createClass({
	mixins: [Reflux.listenTo(Store, 'onChange')],
	getInitalState: function () {
		return {
			input: '',
			keywords: false,
			user: false,
		}
	},
	handleChange: function (e) {
		this.setState({input: e.target.value});
	},
	handleButtonClick: function (key) {
		Actions.handleButtonClick(key)
	},
	render: function () {
		return <div className="addTo">
			<div className="ui fluid input">
  				<input type="text" placeholder='Add keywords or Twitter Handle' onChange={this.handleChange}/>
			</div>
			<div className="clear"></div>
			<div className="ui buttons">
  				<SearchButton click={this.handleButtonClick} stateKey="keywords" text="Keywords" />
  				<div className="or"></div>
  				<SearchButton click={this.handleButtonClick} stateKey="user" text="Twitter Handle" />
			</div>
		</div>
	}
});

module.exports = AddTo;