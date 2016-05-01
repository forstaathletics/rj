import webpack from 'webpack'
// import projectRoot from '../../utils/project-root'
import * as wpk from '../../webpack'

export const alias = 'b'
export const command = 'build'
export const describe = 'Build project for deployment'

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
  },
  watch: {
    default: false,
    alias: 'w',
    type: 'boolean'
  }
}

export const handler = (argv) => {
  // const pRoot = projectRoot()
  const pRoot = argv.cfg.get('APP_ROOT')
  let wpConfig = wpk.dev(pRoot)

  console.log('argv', argv)
  console.log('cfg', argv.cfg)
  console.log('PWD', process.env.PWD)
  console.log('project root', pRoot)
  console.log('proecjt cfg APP_ROOT', argv.cfg.get('APP_ROOT'))

  if (argv.p) {
    console.log('production')
    wpConfig = wpk.prod(pRoot)
    console.log('WebPack configs prod', wpConfig)
  } else {
    console.log('development')
    console.log('WebPack configs dev', wpConfig)
  }

  // const cfg = Config()
  // const rjc = require('./rj.js')
  // // cfg.applyPath(pRoot)
  // console.log('CFG', cfg)
  // console.log('RJC', rjc)

  // Create a compiler
  const compiler = webpack(wpConfig)

  // Run the build!
  compiler.run((err, stats) => {
    if (err) {
      console.error('Compilation failed, fatal error!!!')
      console.error(err)
      return
    }

    const jsonStats = stats.toJson()

    if (stats.hasErrors()) {
      jsonStats.errors.map((e) => {
        console.error(e)
      })
    }

    if (stats.hasWarnings()) {
      jsonStats.warnings.map((w) => {
        console.warn(w)
      })
    }

    console.log(stats.toString(jsonStats))
  })
}
