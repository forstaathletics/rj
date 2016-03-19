import path from 'path'
import fs from 'fs'
import { cmdDir } from '../../constants'
import { findRjRoot } from '../../utils'

export const desc = 'Generate a rj command module'
export const name = 'cmd <name> [--desc] [--force]'

export const builder = {
  force: {
    default: false,
    alias: 'f',
    type: 'boolean',
    describe: 'Overwrite existing command of same name'
  },
  desc: {
    alias: 'd',
    type: 'string',
    describe: 'Command description'
  }
}

export const handler = (argv) => {
  const rjRoot = findRjRoot()

  if (!rjRoot) {
    throw Error('Unable to find root of rj project!!!')
  }

  const cDir = path.join(rjRoot, cmdDir)

  if (!fs.existsSync(cDir)) {
    throw Error('Unable to access the cmds dir at', cDir)
  }

  const cmdPath = path.join(cDir, argv.name + '.js')
  if (!argv.f && fs.existsSync(cmdPath)) {
    throw Error('Cmd module already exists. Use --force if you wish to over write it!')
  }

  const cmd = `
  export const desc = '${argv.desc || ''}'
  export const name = '${argv.name}'

  export const builder = {}
  export const handler = (argv) => {
  }\n`

  const fd = fs.openSync(cmdPath, 'w')
  fs.writeSync(fd, cmd)
  fs.closeSync(fd)
}
