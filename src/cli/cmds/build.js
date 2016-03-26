export const alias = 'b'
export const desc = 'Build project for deployment'
export const name = 'build'

export const builder = {}
export const handler = (argv) => {
  console.log('build', argv)
}
