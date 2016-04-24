export const describe = 'Generate a command module'
export const command = 'generate <item>'
export const alias = 'g'

export const builder = {
  help: {
    alias: 'h',
    type: 'boolean'
  },
  foo: {
    type: 'boolean'
  }
}

const gMap = {
  'component': () => {},
  'container': () => {},
  'pod': () => {},
  'reducer': () => {},
  'action': () => {}
}

const help = () => {
  console.log('HELP!!!')
}

export const handler = (argv) => {
  // console.log('generate', argv)

  if (argv._.length < 2) {
    help()
    return
  }

  const item = argv._[1]
  // console.log(Object.keys(gMap).includes(item))

  if (!Object.keys(gMap).includes(item)) {
    throw Error(`generation sub item '${item}' is invalid!`)
  }
}
