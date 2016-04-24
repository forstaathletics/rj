import Config from './config'
import Cli from './cli'

export default (conf) => {
  let config = Config()

  if (conf) {
    config.apply(conf)
  }

  return config
}

export { Config, Cli }
