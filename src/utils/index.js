import path from 'path'
import fs from 'fs'
import { rjConf } from '../constants'

export const findRjRoot = (cwd = process.cwd()) => {
  if (cwd === '/') {
    return null
  }

  if (fs.existsSync(path.join(cwd, rjConf))) {
    return cwd
  }

  return findRjRoot(path.dirname(cwd))
}
