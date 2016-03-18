#!/usr/bin/env node

import meow from 'meow'

const cli = meow(`
  Usage
    $ rj <command (default: help)>

  Commands
    generate, g
    new, n
    serve, s
    test, t
    build, b

  Options
    -fc, --functional-component 
    -st, --skip-test
    -d, --dry-run
    -v, --verbose
    -e, --environment (default: development)
    -c, --config (default: .rj)
    -cov, --coverage (default: false)

  Examples
    $ rj new awesome-project
    $ rj generate component profile-card
    $ rj generate component profile-card --functional-component
    $ rj generate container users
    $ rj generate reducer users
    $ rj generate action users
`, {
  alias: {
    fc: 'functional-component',
    st: 'skip-test',
    d: 'dry-run',
    v: 'verbose',
    e: 'environment',
    c: 'config',
    h: 'help'
  }
})
