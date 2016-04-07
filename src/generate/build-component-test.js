import upperCamel from 'uppercamelcase'

const buildComponent = (name, opts) => {
  const componentName = upperCamel(name)

  return `import test from 'ava'
import React from 'react'
import sinon from 'sinon'

import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Simulate } from 'react-addons-test-utils'

import ${componentName} from './${componentName}'

test('does something awesome', t => {
  const output = renderStatic()
  t.true(output.includes('children'))
})

function renderStatic (props) {
  return renderToStaticMarkup(<${componentName} {...props} />)
}

function renderToDiv (props) {
  const div = document.createElement('div')
  render (
    <${componentName} {...props}>
      {props.children || 'ohai!'}
    </${componentName}>,
    div
  )

  return div
}
`
}

export default buildComponent
