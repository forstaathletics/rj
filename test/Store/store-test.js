import test from 'ava'
import Store from 'Store'

test.beforeEach((t) => {
  t.context = Store()
})

test('Initial Store builder state', t => {
  t.plan(5)

  t.same(typeof t.context, 'function')
  t.same(typeof t.context._getReducers, 'function')
  t.same(typeof t.context._getMiddlewares, 'function')
  t.same(typeof t.context.addReducer, 'function')
  t.same(typeof t.context.addMiddleware, 'function')
})

test('Store addReducer', t => {
  const reducer = (state, action) => { state }

  t.plan(1)
  t.context.addReducer('test-reducer', reducer)

  t.same(t.context._getReducers().get('test-reducer'), reducer)
})

test('Store addMiddleware', t => {
  const mw = store => next => action => store

  t.plan(1)
  t.context.addMiddleware(mw)

  t.same(t.context._getMiddlewares().get(0), mw)
})

test('Store addReducer and addMiddleware', t => {
  const mw = store => next => action => store
  const reducer = (state, action) => { state }

  t.plan(2)
  t.context.addMiddleware(mw)
  t.context.addReducer('test-reducer', reducer)

  t.same(t.context._getMiddlewares().get(0), mw)
  t.same(t.context._getReducers().get('test-reducer'), reducer)
})

test('Store create a store instance via create() without reducer', t => {
  t.plan(5)
  const store = t.context()

  // Make sure it looks like a Redux store instnace.
  t.same(typeof store, 'object')
  t.same(typeof store.dispatch, 'function')
  t.same(typeof store.subscribe, 'function')
  t.same(typeof store.getState, 'function')
  t.same(typeof store.replaceReducer, 'function')
})

test('Store create a store instance via create() with a reducer', t => {
  const reducer = (state, action) => { return state || {} }

  t.plan(6)
  t.context.addReducer('test-reducer', reducer)
  t.same(t.context._getReducers().get('test-reducer'), reducer)

  const store = t.context()

  // Make sure it looks like a Redux store instnace.
  t.same(typeof store, 'object')
  t.same(typeof store.dispatch, 'function')
  t.same(typeof store.subscribe, 'function')
  t.same(typeof store.getState, 'function')
  t.same(typeof store.replaceReducer, 'function')
})

test('Store create a store instance via create() with a reducer and middleware', t => {
  const reducer = (state, action) => { return state || {} }
  const mw = store => next => action => store

  t.plan(7)
  t.context.addReducer('test-reducer', reducer)
  t.context.addMiddleware(mw)
  t.same(t.context._getReducers().get('test-reducer'), reducer)
  t.same(t.context._getMiddlewares().get(0), mw)

  const store = t.context()

  // Make sure it looks like a Redux store instnace.
  t.same(typeof store, 'object')
  t.same(typeof store.dispatch, 'function')
  t.same(typeof store.subscribe, 'function')
  t.same(typeof store.getState, 'function')
  t.same(typeof store.replaceReducer, 'function')
})
