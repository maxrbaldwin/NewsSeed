var React = require('react');
var ReactDOM = require('react-dom');
var components = require('./app/index.jsx');

var Title = components.title;
var Feed = components.feed;

ReactDOM.render(<Title />, document.querySelector('.home-wrapper .intro'));
ReactDOM.render(<Feed />, document.querySelector('.container.feed'));