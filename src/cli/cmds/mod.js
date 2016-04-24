import fs from 'fs'
import path from 'path'

export let describe =  'Create a JS module from the given path(s)'
export let command = 'mod'

const pathParts = (mPath) => {
  if (!mPath) {
    return []
  }

  const finfo = path.parse(mPath)
  return pathParts(finfo.dir).concat([finfo.name])
}

function mkMod (mPath) {
  const cPath = path.normalize(mPath)

  if (path.isAbsolute(cPath)) {
    throw Error(`Only relative paths are allowed, ${mPath} is an invalid path.`)
  }

  // Break the path into parts so we can easily traverse down it.
  let parts = pathParts(cPath)

  if (fs.existsSync(cPath)) {
    const statData = fs.statSync(cPath)
    if (!statData.isDirectory()) {
      // console.warn(`${mPath} exists and is not a directory.`)
      // Don't deal with the last node if it's not a directory
      parts = parts.slice(0, -1)
    }
  }

  function mkdirp (p, parts) {
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p)
    }

    const indx = path.join(p, 'index.js')
    if (!fs.existsSync(indx)) {
      fs.closeSync(fs.openSync(indx, 'w'))
    }

    if (parts.length === 0) {
      return
    }

    mkdirp(path.join(p, parts[0]), parts.slice(1))
  }

  mkdirp(parts[0], parts.slice(1))
}

export let builder = {
  quiet: {
    default: false,
    alias: 'q',
    type: 'boolean'
  }
}
export let handler = (argv) => {
  if (!argv._) {
    return
  }

  if (argv._[0] === 'mod') {
    argv._.slice(1).forEach((mod) => {
      mkMod(mod)
      if (!argv.q) {
        console.log('Created mod at path', mod)
      }
    })
  }
}
