import { List, Map } from 'immutable'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

/**
 * A high level, testable, store 'maker'.
 * Intended to make it easy to create a store instance from
 * a pre-defined config as well as dynamically imported data.
 * Also makes the creation of multiple stores easy.
 *
 * import storeMaker from 'Store'
 *
 * // Create a storeMaker instnace
 * let Store = storeMaker()
 *
 * // build up a store
 * Store.addReducer(...)
 * Store.addMiddleware(...)
 *
 * // get a Redux store instance
 * let store = Store()
 */

export default () => {
  let reducers = Map()
  let middlewares = List()

  let create = (initial = {}) => {
    let reducer = combineReducers(reducers.toJS())
    let enhancers = applyMiddleware(...middlewares.toJS())

    if (process.env.NODE_ENV !== 'production') {
      enhancers = compose(
        enhancers,
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    }

    return createStore(reducer, initial, enhancers)
  }

  // simple getters for testing.
  create._getReducers = () => reducers
  create._getMiddlewares = () => middlewares

  create.addReducer = (name, r) => {
    reducers = reducers.set(name, r)
    return reducers
  }

  create.addMiddleware = (mw) => {
    if (List.isList(mw) || Array.isArray(mw)) {
      middlewares = middlewares.concat(mw)
    } else {
      middlewares = middlewares.push(mw)
    }

    return middlewares
  }

  return create
}
