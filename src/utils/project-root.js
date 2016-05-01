import path from 'path'
import fs from 'fs'

const pkg = 'package.json'

const projectRoot = (cwd) => {
  let statData = null
  cwd = cwd || process.env.PWD

  if (cwd === '/') {
    return null
  }

  let pname = path.join(cwd, pkg)
  try {
    statData = fs.statSync(pname)
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }
  }

  if (statData && statData.isFile()) {
    return cwd
  }

  return projectRoot(path.dirname(cwd))
}

export default projectRoot
