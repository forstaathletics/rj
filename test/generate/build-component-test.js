import test from 'ava'
import buildComponent from '../../src/generate/build-component'

const expected = `import React, { PropTypes } from 'react'

const Awesome = ({ foo, bar, children }) => {
  return (
    <div>
      <h1>Hello, I'm located in components/awesome</h1>
      <h3>I accept the following properties
      <ul>
        <li>foo</li>
        <li>bar</li>
        <li>children</li>
      </ul>
    </div>
  )
}

Awesome.propTypes = {
  foo: PropTypes.number.required,
  bar: PropTypes.string,
  children: PropTypes.array
}

export default Awesome
`

test('creates component', t => {
  t.plan(1)

  const output = buildComponent('awesome', {
    props: ['foo:number:required', 'bar']
  })

  t.same(output, expected)
})

test('does not duplicate children prop', t => {
  t.plan(1)

  const output = buildComponent('awesome', {
    props: ['foo:number:required', 'bar', 'children:array']
  })

  t.same(output, expected)
})
