const baseDefinitions = require('./definitions')

const monoScope = {
  baseDefinitions,
  ajv:baseDefinitions.ajv,
  UnitBuilder: baseDefinitions.UnitBuilder,
  log: (msg) => console.log(msg)
}

module.exports = monoScope