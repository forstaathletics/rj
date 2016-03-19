#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import { findCmds } from '../utils/cmd'

let cmdsDir = path.join(__dirname, 'cmds')
let cmds = findCmds(cmdsDir)

cmds.subs.map(sub => {
  if (sub.reqObjKeys.includes('builder') &&
      sub.reqObjKeys.includes('handler')) {
    const cmd = sub.reqObj
    const cmdName = cmd.name || sub.name
    let cmdDesc = cmd.desc || ''

    if (cmd.alias) {
      yargs.command(cmd.alias, false, cmd)
      cmdDesc += '\nAlias: ' + cmd.alias
    }

    yargs.command(cmdName, cmdDesc, cmd)
  }
})

let argv = yargs.help('h').alias('h', 'help')
  .epilog('copyright 2016').argv

// Show help if no commands are given
if (!argv._ || argv._.length === 0) {
  yargs.showHelp()
}
