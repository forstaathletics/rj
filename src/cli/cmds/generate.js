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

  if (argv.foo) {
    help()
    return
  }
}
