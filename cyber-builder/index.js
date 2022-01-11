
const core = require('./core')
const build = require('./helpers/cyber-build')

const cyberBuilder = {
  ...core,
  Unit: require('./units/Unit'),
  cyberBuild: build,
  build
}

module.exports = cyberBuilder

cyberBuilder.start = require('./helpers/start')