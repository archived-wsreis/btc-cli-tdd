'use strict';

var request = require('request');
var chalk = require('chalk');
var ora = require('ora');

var spinner = ora({
  text: 'Retrieving data...',
  color: 'yellow'
});

function convert() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;
  spinner.start();
  request(url, function (error, response, body) {
    var apiResponse = void 0;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
      console.log(chalk.yellow(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResponse.price));
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    }
  });
}

module.exports = convert;