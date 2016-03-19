import fs from 'fs'
import path from 'path'

export const MOD_IS_NOT = Symbol.for('MOD_IS_NOT')  // The module is a directory but has no index.js
export const MOD_IS_FILE = Symbol.for('MOD_IS_FILE')  // The module is a standalone file
export const MOD_IS_SIMPLE = Symbol.for('MOD_IS_SIMPLE')  // The module is a directory with _only one file and that file is index.js_
export const MOD_IS_FAT = Symbol.for('MOD_IS_FAT')  // The module is a directory with files that aren't index.js and the dir has an index.js

let determineModType = (mod) => {
  if (!mod.isDir) {
    return MOD_IS_FILE
  }

  let hasIndex = mod.files.includes('index.js')

  if (mod.files.length === 1 && hasIndex) {
    return MOD_IS_SIMPLE
  }

  if (mod.files.length > 1 && hasIndex) {
    return MOD_IS_FAT
  }

  return MOD_IS_NOT
}

export let getModInfo = (modPath) => {
  // console.log('getModInfo:', modPath)
  const statData = fs.statSync(modPath)

  let subs = []
  let files = []
  let isDir = statData.isDirectory()

  if (isDir) {
    files = fs.readdirSync(modPath)
    // console.log('FILES:', files)

    for (var i = 0; i < files.length; i++) {
      let fname = path.join(modPath, files[i])
      subs.push(getModInfo(fname))
    }
  }

  let res = {
    'path': modPath,
    'name': path.basename(modPath),
    'isDir': isDir,
    'files': files,
    'subs': subs
  }

  if (!isDir) {
    // truncate the name up to the first '.'
    let idx = res.name.indexOf('.')
    if (idx !== -1) {
      res.name = res.name.slice(0, idx)
    }
  }

  res.modType = determineModType(res)

  if (res.modType !== MOD_IS_NOT) {
    res.reqObj = require(modPath)
    res.reqObjKeys = Object.keys(res.reqObj)
    // console.log('REQUIRE:', modPath, res.reqObj)
  }

  return res
}


