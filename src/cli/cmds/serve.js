export const alias = 's'
export const desc = 'Serve the current rj project'
export const name = 'serve'

export const builder = {}
export const handler = (argv) => {
  console.log('serve', argv)
}
