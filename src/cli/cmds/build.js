// import webpack from 'webpack'
// import Config from 'rj/config'
import projectRoot from '../../utils/project-root'

export const alias = 'b'
export const desc = 'Build project for deployment'
export const name = 'build'

export const builder = {}

export const handler = (argv) => {
  console.log('build', argv)
  console.log('proejct root', projectRoot())

  // if (process.env.NODE_ENV === 'production') {
  // }

  // const = webpack(webpackConfig)
}
