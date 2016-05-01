import test from 'ava'
import buildComponentTest from '../../src/generate/build-component-test'

const expected = `import test from 'ava'
import React from 'react'
import sinon from 'sinon'

import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Simulate } from 'react-addons-test-utils'

import Awesome from './Awesome'

test('does something awesome', t => {
  const output = renderStatic()
  t.true(output.includes('children'))
})

function renderStatic (props) {
  return renderToStaticMarkup(<Awesome {...props} />)
}

function renderToDiv (props) {
  const div = document.createElement('div')
  render (
    <Awesome {...props}>
      {props.children || 'ohai!'}
    </Awesome>,
    div
  )

  return div
}
`

test('creates component test', t => {
  t.plan(1)

  const output = buildComponentTest('awesome', {
    props: ['foo:number:required', 'bar']
  })

  t.same(output, expected)
})
