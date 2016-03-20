import { List, Map } from 'immutable'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxDevtools from './dev/redux-devtools'

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

  let getCreateStore = function (mw) {
    if (mw.size === 0) {
      return createStore
    }

    return applyMiddleware(...mw.toJS())(createStore)
  }

  let create = (initial = {}) => {
    let reducer = combineReducers(reducers.toJS())
    // Choose a the createStore/applyMiddleware wrapper based on production env.
    // Use the devtools version for dev
    let gcs = process.env.NODE_ENV !== 'production' ? reduxDevtools : getCreateStore
    let cs = gcs(mw)

    return cs(reducer, initial)
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
