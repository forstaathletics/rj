import { combineReducers } from 'redux'
import { Map } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { formNormalizers as authNormalizers } from 'Auth/UPForm'
import { reducer as parseReducer } from 'fjsParse'
import { reducer as notifyReducer } from 'notify'

var reducerMap = Map()

export function pageReducer (state = Map(), action) {
  switch (action.type) {
    case 'UPDATE_PAGE_INFO':
      return state.merge(action.payload)
  }
  return state
}

export function addReducer (name, reducer) {
  reducerMap = reducerMap.set(name, reducer)
  return reducerMap
}

addReducer('page', pageReducer)
addReducer('form', formReducer.normalize(authNormalizers))
addReducer('parse', parseReducer)
addReducer('notify', notifyReducer)

export default () => combineReducers(reducerMap.toJS())
