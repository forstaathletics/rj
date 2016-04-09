import { createStore, applyMiddleware, compose } from 'redux'

export default function (mw) {
  return compose(
    applyMiddleware(...mw.toJS()),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension() : (f) => f
  )(createStore)
}
