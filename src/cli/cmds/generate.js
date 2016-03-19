export const desc = 'Generate a command module'
export const name = 'generate <item>'
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

let help = () => {
  console.log('HELP!!!')
}

export const handler = (argv) => {
  console.log('generate', argv)

  if (argv._.length < 2) {
    help()
    return
  }

  const item = argv._[1]
}
