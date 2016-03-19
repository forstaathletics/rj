import test from 'ava'
import buildPackage from '../../src/generate/build-package'

test('adds project name', t => {
  t.plan(1)

  const output = buildPackage('awesome')
  t.same(output.name, 'awesome')
})
