export const alias = 'g'
export const desc = 'Generate a command module'
export const name = 'generate'

export const builder = {}
export const handler = (argv) => {
  console.log('generate', argv)
}
