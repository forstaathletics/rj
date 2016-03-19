import upperCamel from 'uppercamelcase'
import isPresent from 'is-present'

const buildComponent = (name, opts) => {
  const componentName = upperCamel(name)

  const props = opts.props || []
  const propNames = props.map(prop => prop.split(':')[0])

  const hasChildrenProp = props.some(prop => prop.indexOf('children') == 0)

  if (!hasChildrenProp) {
    propNames.push('children')
    props.push('children:array')
  }

  const propsAsArgs = propNames.join(', ')

  const propsAsHash = props.map(prop => {
    const [name, type, required] = prop.split(':')
    let str = `  ${name}: PropTypes.`
    str += type || 'string'

    if (isPresent(required)) {
      str += '.required'
    }

    return `${str}`
  }).join(',\n')

  const propsAsLi = propNames.map(prop => `        <li>${prop}</li>`).join('\n')

  return `import React, { PropTypes } from 'react'

const ${componentName} = ({ ${propsAsArgs} }) => {
  return (
    <div>
      <h1>Hello, I'm located in components/${name}</h1>
      <h3>I accept the following properties
      <ul>
${propsAsLi}
      </ul>
    </div>
  )
}

${componentName}.propTypes = {
${propsAsHash}
}

export default ${componentName}
`
}

export default buildComponent
