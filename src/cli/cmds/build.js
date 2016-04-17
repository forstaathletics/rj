import path from 'path'
import webpack from 'webpack'
import Config from '../../config'
import projectRoot from '../../utils/project-root'

export const alias = 'b'
export const desc = 'Build project for deployment'
export const name = 'build'

export const builder = {
  prod: {
    default: false,
    alias: 'p',
    type: 'boolean'
  },
  dev: {
    default: true,
    alias: 'd',
    type: 'boolean'
  }
}

export const handler = (argv) => {
  const pRoot = projectRoot()
  console.log('PWD', process.env.PWD)
  console.log('proejct root', pRoot)

  if (argv.p) {
    console.log('production')
  } else {
    console.log('development')
  }

  const cfg = Config()
  const rjc = require('./rj.js')
  // cfg.applyPath(pRoot)
  console.log('CFG', cfg)
  console.log('RJC', rjc)

  // const = webpack(webpackConfig)
}
