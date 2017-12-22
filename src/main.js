#!/usr/bin/env node
var program = require('commander')

const pkg = require('../package.json');

program
    .version(pkg.version)
    .description('Convert Bitcoin to any currency defined')
    .parse(process.argv)