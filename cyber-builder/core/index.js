const Ajv = require("ajv")
const localize = require("ajv-i18n")

const DEFAULT_LOCALIZE = 'ru'

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: "isLambda",
  type: "boolean",
  validate: (schema, data) => {
    const isFunc = typeof data === 'function'
    return schema ? isFunc : !isFunc
  }
})

ajv.addKeyword({
  keyword: "isSchema",
  type: "boolean",
  validate: (schema, data) => {
    let rv = true

    if(! ajv.validateSchema(schema) ) {
      localize[DEFAULT_LOCALIZE](ajv.errors)
      // ajv.errorsText(validate.errors, params)
      rv = false
    }
    return schema ? rv : !rv
  }
})



const schemas = {
  "unit-config": require('../schemas/unit-config.json'),
  "build-config": require('../schemas/build-config.json')
}

const check = {}
for (const schemaName in schemas ) {
  check[schemaName] = ajv.compile(schemas[schemaName])
  check[schemaName].errorsText = (params = {}) => {  // separator: '\n'
    const validate = check[schemaName]
    localize[DEFAULT_LOCALIZE](validate.errors)
    return ajv.errorsText(validate.errors, params)
  }
}

const coreDependencies = {
  yaml: require('yaml'),
  ajv, schemas, check
}

module.exports = coreDependencies