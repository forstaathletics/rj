#!/usr/bin/env node

import meow from 'meow'

const cli = meow(`
  Usage
    $ rj <command (default: help)>

  Options
    -fc, --functional-component 
    -st, --skip-test
    -d, --dry-run
    -v, --verbose
    -e, --environment (default: development)
    -c, --config (default: .rj)

  Examples
    $ rj component profile-card
    $ rj component profile-card --functional-component
    $ rj container users
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
