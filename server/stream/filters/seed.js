var chalk  = require('chalk');

var commonFilters = require('./common');

var seedFilter = function (tweet) {
  console.log(chalk.blue(tweet.text));
};

module.exports = seedFilter;
