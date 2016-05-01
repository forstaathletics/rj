export const describe = false
export const command = 'hello'

export const builder = {
  sassy: {
    default: false,
    alias: 's',
    type: 'boolean'
  }
}

export const handler = (argv) => {
  let sass = argv.s ? '!!!' : ''

  argv._.slice(1).forEach((arg) => {
    console.log('Hello', arg + sass)
  })
}
