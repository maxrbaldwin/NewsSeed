var React = require('react');
var ReactDom = require('react-dom');

var Feed = require('./Feed/Feed.jsx');
var Nav = require('./Nav/Nav.jsx');

var App = React.createClass({
	getInitialState: function () {
		return {
			key: 'users'
		}
	},
	render: function () {
		return <div className="app">
			<Feed initialKey={this.state.key} id="Feed" />
			<Nav initialKey={this.state.key} id="Nav" />
		</div>
	}
});

ReactDom.render(<App />, document.querySelector('#App'));