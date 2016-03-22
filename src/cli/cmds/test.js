export const alias = 't'
export const desc = 'Run rj project\'s tests'
export const name = 'test'

export const builder = {}
export const handler = (argv) => {
  console.log('test', argv)
}
