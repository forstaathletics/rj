#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import { findCmds } from '../utils'

let cmdsDir = path.join(__dirname, 'cmds')
let cmds = findCmds(cmdsDir)
// console.log('cmds?', cmds)

let subCmds = cmds.subs.reduce((prev, sub) => {
  if (sub.name === 'index') {
    return prev
  }

  if (sub.reqObjKeys.includes('builder') && sub.reqObjKeys.includes('handler')) {
    // console.log(sub.name, sub.reqObjKeys)
    return prev.concat([sub])
  }
}, [])

// console.log('subCmds', subCmds)
subCmds.forEach((sc) => {
  yargs.command(sc.name, '', require(path.join(cmdsDir, sc.name)))
})

let argv = yargs.help('h').alias('h', 'help')
  .epilog('copyright 2016').argv
