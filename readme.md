# rj

React CLI and runtime basics. Not a YARBR!

## Installation

```sh
npm i -g rj
```

## Usage

```sh
❯ rj -h

  rj, Command React

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
    $ rj generate component profile-card
    $ rj generate component profile-card --functional-component
    $ rj generate container users
```

##### Commands

- `generate`
- `new`
- `test`
- `build`
- `serve`
- `destroy`

## License

APACHE

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
