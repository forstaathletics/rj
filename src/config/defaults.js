import { Map, List } from 'immutable'
import promiseMiddleware from 'redux-promise'

export default Map({
  APP_NAME: 'Application Name',
  AUTH_BACKEND: '',
  REACT_ROUTER_REDUX: true,
  REDUX_MIDDLEWARE: List.of(promiseMiddleware),
  REDUX_DEV_TOOLS_EXTENSION: true,
  REDUX_DEFAULT_STORE: {'page': Map({'header': Map({'title': 'Application Title'})})},
  BUILD_OUTPUT_DIR: 'dist'
})
