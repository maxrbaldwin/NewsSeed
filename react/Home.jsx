var React = require('react');
var ReactDom = require('react-dom');

var Feed = require('./Feed/Feed.jsx');
var Nav = require('./Nav/Nav.jsx');

ReactDom.render(<Feed listenTo="keywords" />, document.querySelector('#Keywords'));
ReactDom.render(<Feed listenTo="users" />, document.querySelector('#Users'));
ReactDom.render(<Nav />, document.querySelector('#Nav'));