#!/usr/bin/env node
const program = require('commander')
const exists = require('fs').existsSync
const chalk = require('chalk')
const path = require('path')
const home = require('user-home')
const tildify = require('tildify')
const inquirer = require('inquirer')
const logger = require('../lib/logger')
const localPath = require('../lib/local-path')

const isLocalPath = localPath.isLocalPath
const getTemplatePath = localPath.getTemplatePath

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('-o, --offline', 'use cached template')

/**
 cli help
 */

program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ xs init webpack my-project')
  console.log()
  console.log(chalk.gray('    # create a new project straight from a github template'))
  console.log('    $ xs init username/repo my-project')
  console.log()
})

function help() {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}

help()

let template = program.args[0]
const hasSlash = template.indexOf('/') > -1
const rawName = program.args[1]
const inPlace = !rawName || rawName === '.'
const name = inPlace ? path.relative('../', process.cwd()) : rawName
const to = path.resolve(rawName || '.')
const clone = program.clone || false

const tmp = path.join(home, '.xs-cli', template.replace(/[\/:]/g, '-'))
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`)
  template = tmp
}

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

if (inPlace || exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      run()
    }
  }).catch(logger.fatal)
} else {
  run()
}

/**
 * Check, download and generate the project.
 */

function run() {
  // check if template is local
  // 检查本地模板
  if(isLocalPath(template)){
    const templatePath = getTemplatePath(template)
    if (exists(templatePath)) {

    } else {
      logger.fatal('Local template "%s" not found.', template)
    }
  }else{

  }
}