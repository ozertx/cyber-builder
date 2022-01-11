
const core = require('./core')

const build = require('./cyber-build')

const cyberBuilder = {
  ...core,
  Unit: require('./Unit'),
  UnitBuilder: require('./UnitBuilder'),
  cyberBuild: build,
  build
}

module.exports = cyberBuilder

cyberBuilder.start = require('./start')