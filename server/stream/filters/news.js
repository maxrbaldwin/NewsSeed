var chalk = require('chalk');

var commonFilters = require('./common');

var newsFilter = function(tweet) {
  console.log(chalk.yellow(tweet.text));
};

module.exports = newsFilter;
