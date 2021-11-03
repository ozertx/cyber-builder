const Ajv = require("ajv")


const coreDependencies = {
  schemas: {
    "unit-config": require('../schemas/unit-config.json'),
    "build-config": require('../schemas/build-config.json')
  },
  yaml: require('yaml'),
  ajv: new Ajv({ allErrors: true })
}

module.exports = coreDependencies