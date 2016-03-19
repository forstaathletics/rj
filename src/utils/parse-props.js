import isPresent from 'is-present'

const parseProps = (props = []) => {
  const parsedProps = { props }

  parsedProps.names = props.map(prop => prop.split(':')[0])

  const hasChildrenProp = props.some(prop => prop.indexOf('children') == 0)

  if (!hasChildrenProp) {
    parsedProps.names.push('children')
    parsedProps.props.push('children:array')
  }

  parsedProps.asArgs = parsedProps.names.join(', ')

  parsedProps.asHash = props.map(prop => {
    const [name, type, required] = prop.split(':')
    let str = `  ${name}: PropTypes.`
    str += type || 'string'

    if (isPresent(required)) {
      str += '.required'
    }

    return `${str}`
  }).join(',\n')

  parsedProps.asLi = parsedProps.names.map(prop => `        <li>${prop}</li>`).join('\n')

  return parsedProps
}

export default parseProps
