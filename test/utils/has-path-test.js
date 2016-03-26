import test from 'ava'
import hasPath from '../../src/utils/has-path'

const stringsWithPaths = [
  'foo/bar',
  'foo/bar/baz'
]

const stringsWithoutPaths = [
  'foo_bar',
  'foo-bar-baz'
]

test('returns true for paths', t => {
  t.plan(stringsWithPaths.length)

  stringsWithPaths.forEach(str => {
    t.true(hasPath(str))
  })
})

test('returns false when no path exists', t => {
  t.plan(stringsWithoutPaths.length)

  stringsWithoutPaths.forEach(str => {
    t.false(hasPath(str))
  })
})
