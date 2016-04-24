import { Map, List, Iterable } from 'immutable'
import _defaultCfg from './defaults'

let setExcept = 'Only immutable/string/number/boolean values are allowed in the config'
let pushExcept = 'push() only supports config items of type List'
let onlyMapExcept = 'Only Immutable Map is allowed as a config document'

let Config = (...args) => {
  let _cfg = _defaultCfg

  const res = {
    get: (name) => _cfg.get(name),

    /**
    * Set a key -> value on the config object.
    * If the value has a typeof 'object' then it must be an object
    * from Immutable
    */
    set: function (key, val) {
      // Only allow Immutable values
      if (typeof val === 'object' && !Iterable.isIterable(val)) {
        throw Error(setExcept)
      }

      if (typeof val === 'undefined' || val === null) {
        throw Error(setExcept)
      }
      _cfg = _cfg.set(key, val)
    },

    /**
    * Push a value(s) onto a config value that is a List or not set.
    * If the config value is not set, then it will be created as a List
    * containing the value(s).
    * The value being pushed can be of any type, but if the value is of List or Array then by
    * default it's items will be concatenated to the config List.
    * If the second parameter to `push` is false, then if the value passed is of type List or Array
    * that List or Array will be pushed as a single item instead of it's items concatenated.
    */
    push: function (key, val, concat = true) {
      let item = _cfg.get(key, List())

      if (!List.isList(item)) {
        throw Error(pushExcept)
      }

      if ((Array.isArray(val) || List.isList(val)) && concat) {
        item = item.concat(val)
      } else {
        item = item.push(val)
      }

      _cfg = _cfg.set(key, item)

      return item
    },

    /**
    * Reset the running config to the default config.
    * Useful for testing and other shinanegans.
    */
    reset: function () { _cfg = _defaultCfg },
    defaults: () => _defaultCfg,

    /**
    * Use this to apply, merge, another config object into the
    * running config. For instance, to apply an app wide config.
    */
    apply: function (cfg) {
      // Only allow Immutable values
      if (!Map.isMap(cfg)) {
        throw Error(onlyMapExcept)
      }

      // Enforce each value is Immutable or an immutable primitive
      cfg.map((v, k) => {
        if (typeof v === 'object' && !Iterable.isIterable(v)) {
          // config documents must have immutable or Immutable values
          throw Error(onlyMapExcept)
        }
      })

      _cfg = _cfg.merge(cfg)
      return _cfg
    },

    toString: function () { return _cfg.toString() }
  }

  // Apply any args as an overlay config
  if (Array.isArray(args) && args.length > 0) {
    _cfg = args.reduce(_cfg, (prev, cfg) => { prev.apply(cfg) })
  }

  return res
}

Config.defaults = _defaultCfg
export default Config
