const Ajv = require("ajv")

const ajv = new Ajv({ allErrors: true })
const schemas = {
  "unit-config": require('../schemas/unit-config.json'),
  "build-config": require('../schemas/build-config.json')
}

const check = {}
for (const schemaName in schemas ) {
  check[schemaName] = ajv.compile(schemas[schemaName])
}


const coreDependencies = {
  yaml: require('yaml'),
  ajv, schemas, check
}

module.exports = coreDependencies