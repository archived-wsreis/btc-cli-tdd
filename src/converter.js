const request = require('request');
const chalk = require('chalk');

function convert(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  
  request(url, (error, response, body) => {
    let apiResponse;
    try{
      apiResponse = JSON.parse(body);
      console.log(`${chalk.yellow(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
    }catch(parseError){
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    }
  });
  
}

module.exports = convert;
