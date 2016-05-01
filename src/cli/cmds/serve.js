export const alias = 's'
export const describe = 'Serve the current rj project'
export const command = 'serve'

export const builder = {}
export const handler = (argv) => {
  console.log('serve', argv)
}
