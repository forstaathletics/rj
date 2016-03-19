import upperCamel from 'uppercamelcase'
import parseProps from '../utils/parse-props'

const buildComponent = (name, opts) => {
  const componentName = upperCamel(name)
  const { asArgs, asLi, asHash } = parseProps(opts.props)

  return `import React, { PropTypes } from 'react'

const ${componentName} = ({ ${asArgs} }) => {
  return (
    <div>
      <h1>Hello, I'm located in components/${name}</h1>
      <h3>I accept the following properties
      <ul>
${asLi}
      </ul>
    </div>
  )
}

${componentName}.propTypes = {
${asHash}
}

export default ${componentName}
`
}

export default buildComponent
