var chalk  = require('chalk');

var tweetFilter = function (tweet) {
  console.log(chalk.blue(tweet.text));
};

module.exports = tweetFilter;
