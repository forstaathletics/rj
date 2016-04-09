# rj [![Build Status](https://secure.travis-ci.org/forstaathletics/rj.png?branch=master)](https://travis-ci.org/forstaathletics/rj) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) [![Circle CI](https://circleci.com/gh/forstaathletics/rj.svg?style=svg)](https://circleci.com/gh/forstaathletics/rj)

__Work in progress__

Command React.

```
npm i -g rj && rj new awesome-react-project
```

Meet `rj`. `rj` is the missing CLI for building React apps. This isn't Yet Another React Boilerplate Repo (YARBR).
This is an interface that seeks to improve developer happiness by handling the scaffolding and tasks that all projects share.
`rj` seeks to consolidate the best community paradigms, as the thoughts of a community are better than the thought of developers on a single project.

`rj` handles the build tooling and configuration so you can focus on building beautiful, interactive applications.

Features:

- Hot reloading, code splitting, and tree shaking
- Concurrent tests with ava
- Sensical build system with automatic minification and concatenation
- CSS module system
- Sass compilation
- Project, component, container, and reducer generation
- Redux integration
- Developer middleware

Built with < 3 using:

- webpack
- babel
- ava
- redux
- css-modules
- cssnano
- yargs

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
    $ rj generate component profile-card username avatarUrl:string:required followers:number
    $ rj generate component profile-card --functional-component
    $ rj generate container users
    $ rj generate reducer users
    $ rj generate action users
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
