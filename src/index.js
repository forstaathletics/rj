import { Map } from 'immutable'
import Config from './config'
import Cli from './cli'
import { common, prod, dev } from './webpack'

export default (conf) => {
  let wpConfig = Map({
    'webpack': Map({
      'common': common(conf.get('APP_ROOT')),
      'dev': dev(conf.get('APP_ROOT')),
      'prod': prod(conf.get('APP_ROOT'))
    })
  })

  let config = Config(wpConfig)

  if (conf) {
    config.apply(conf)
  }

  return config
}

export { Config, Cli }
