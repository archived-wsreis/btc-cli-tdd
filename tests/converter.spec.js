const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const chalk = require('chalk');

chai.use(sinonChai);

const convert = require('../src/converter')

describe('Converter', () => {
  let consoleStub;
  
  const responseMock = {
    "success": true,
    "time": "2017-07-02 18:51:29",
    "price": 2490.78
  };

  beforeEach(() =>{
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach( () => {
    console.log.restore();
  });		    
  
  		  
  it('should use currency USD and 1 as amount default', done => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1})
      .reply(200, responseMock);
    convert();
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`);
      done();
    }, 300)
  });
  
  it('should use currency USD and 10 as amount', done => {
   nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10})
      .reply(200, responseMock);
    convert('USD', 10);
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`);
      done();
   }, 300);
  });
  
  it('should message user when api reply with error', done => {
    
   nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10})
      .replyWithError('Error');
      
    convert('USD', 10);
    
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      done();
   }, 300);    
    
  })
});