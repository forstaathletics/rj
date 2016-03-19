#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import { findCmds } from '../utils'

let cmdsDir = path.join(__dirname, 'cmds')
let cmds = findCmds(cmdsDir)
// console.log('cmds?', cmds)

let subCmds = cmds.subs.reduce((prev, sub) => {
  if (sub.reqObjKeys.includes('builder') && sub.reqObjKeys.includes('handler')) {
    return prev.concat([sub])
  }

  return prev
}, [])

// console.log('subCmds', subCmds)
subCmds.forEach((sc) => {
  let cmd = sc.reqObj
  yargs.command(cmd.name || sc.name, cmd.desc || '', cmd)
})

let argv = yargs.help('h').alias('h', 'help')
  .epilog('copyright 2016').argv

// Show help if no commands are given
if (!argv._ || argv._.length === 0) {
  yargs.showHelp()
}
