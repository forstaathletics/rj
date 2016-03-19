#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import { findCmds } from '../utils/cmd'

let cmdsDir = path.join(__dirname, 'cmds')
let cmds = findCmds(cmdsDir)
// console.log('cmds?', cmds)

cmds.subs.map(sub => {
  if (sub.reqObjKeys.includes('builder') &&
      sub.reqObjKeys.includes('handler')) {
    let cmd = sub.reqObj
    // console.log('LIKE CMD', cmd)
    yargs.command(cmd.name || sub.name,
                  cmd.desc || '',
                  cmd)
  }
})

let argv = yargs.help('h').alias('h', 'help')
  .epilog('copyright 2016').argv

// Show help if no commands are given
if (!argv._ || argv._.length === 0) {
  yargs.showHelp()
}
