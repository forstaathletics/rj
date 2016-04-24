export const alias = 't'
export const describe = 'Run rj project\'s tests'
export const command = 'test'

export const builder = {}
export const handler = (argv) => {
  console.log('test', argv)
}
