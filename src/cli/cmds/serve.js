import Server from '../../server'

export const alias = 's'
export const command = 'serve'
export const describe = 'Serve the current rj project'

export const builder = {}
export const handler = (argv) => {
  // console.log('rj serve', argv)

  let server = Server(argv.cfg)
  console.log('Server INST', server)

  server.serve()
}
