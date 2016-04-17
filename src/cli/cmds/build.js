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
  console.log('proejct root', projectRoot())

  if (argv.p) {
    console.log('production', Config)
  } else {
    console.log('development', Config)
  }

  // const = webpack(webpackConfig)
}
