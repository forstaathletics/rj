import copyDir from 'copy-dir'
import isBlank from 'is-blank'
import path from 'path'
import fs from 'fs'

export const alias = 'n'
export const desc = 'Create new rj project'
export const name = 'new'

export const builder = {}
export const handler = (argv) => {
  const projName = argv['_'][1]

  if (isBlank(projName)) {
    console.error('rj expected a project name')
    process.exit(1)
  }

  mkdir(projName)
  copyDir.sync(path.join(__dirname, '../../../src/templates/new'), projName)
}

const mkdir = name => {
  try {
    fs.mkdirSync(name)
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.error(`rj could not create a project there, ${name} already exists`)
    } else {
      throw e
    }
  }
}
