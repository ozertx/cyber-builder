
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




// module.exports = (scope = {}) => {
//   if( typeof(scope) != 'object') throw new Error('Scope is not object')

//   Object.assign(scope, cyberBuilder)

//   return scope
// }
