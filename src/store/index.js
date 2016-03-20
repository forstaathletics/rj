import { List } from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import reducer, { addReducer } from './reducers'
import reduxDevtools from './dev/redux-devtools'

// var middleWares = List.of(mwFromSettings)
let middleWares = List()

export function addMiddleware (mw) {
  middleWares = middleWares.push(mw)
  return middleWares
}

var getCreateStore = function (mw) {
  if (mw.size === 0) {
    return createStore
  }

  return applyMiddleware(...mw.toJS())(createStore)
}

/**
 * If not in production mode, add support for the redux-devtool browser extension
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
 */
if (process.env.NODE_ENV !== 'production') {
  getCreateStore = reduxDevtools
}

export { addReducer }

export default function makeStore (initial = {}) {
  let cs = getCreateStore(middleWares)
  return cs(reducer(), initial)
}
