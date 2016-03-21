const buildPackage = name => {
  const pkg = require('../templates/package.json')
  pkg.name = name || 'rj'
  return pkg
}

export default buildPackage
