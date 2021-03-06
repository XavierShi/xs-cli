#!/usr/bin/env node

const program = require('commander');

program.version(require('../package').version, '-v, --version')
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
program.parse(process.argv);