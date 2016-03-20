import { combineReducers } from 'redux'
import { Map } from 'immutable'

let reducerMap = Map()

export function addReducer (name, reducer) {
  reducerMap = reducerMap.set(name, reducer)
  return reducerMap
}

export default () => combineReducers(reducerMap.toJS())
