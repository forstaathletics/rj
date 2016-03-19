
export let builder = {
  sassy: {
    default: false,
    alias: 's',
    type: 'boolean'
  }

}
export let handler = (argv) => {
  // console.log('CMD argv', argv)
  if (!argv._) {
    return
  }

  let sass = argv.s ? '!!!' : ''

  if (argv._[0] === 'hello') {
    argv._.slice(1).forEach((arg) => {
      console.log('Hello', arg + sass)
    })
  }
}
export let desc = 'Echo back arguments'
export let name = 'hello'
