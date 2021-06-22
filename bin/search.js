#! /usr/bin/env node

const program = require('commander')

program
  .command('create <app-name>')
  .description('创建一个新的项目')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-c, --clone', 'use git clone when fetch remote preset')
  .action((name, cmd) => {
    // console.log('name', name)
    // console.log('cmd', cmd)
    require('../lib/create')(name, cmd)
  })
  // .version(`Version is ${require('../package.json').version}`)
  // .description('从0开始 实现一个cli脚手架')
  // .usage('<command> [options]')

program.parse(process.argv)