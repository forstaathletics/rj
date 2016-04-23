import Config from './config'

export default (conf) => {
  let config = Config()

  if (conf) {
    config.apply(conf)
  }

  return config
}

export { Config }
