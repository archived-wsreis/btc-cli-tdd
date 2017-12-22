#!/usr/bin/env node
'use strict';

var program = require('commander');

var pkg = require('../package.json');

var converter = require('./converter');

program.version(pkg.version).description('Convert Bitcoin to any currency defined').option('-C, --currency <currency>', 'Currency to be converted. (Default: USD)').option('-A, --amount <amount>', 'Amount in bitcoin to be converted. (Default: 1)').parse(process.argv);

converter(program.currency, program.amount);