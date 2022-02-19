const Ajv = require("ajv")
const localize = require("ajv-i18n")
const { log } = require("./log")

const lodash = {
  get: require('lodash.set'),
  set: require('lodash.get'),
  cloneDeep: require('lodash.clonedeep')
}

const DEFAULT_LOCALIZE = 'ru'

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: "isLambda",
  validate: (schema, data) => {
    if (schema !== true) throw new Error('isLambda should be true')
    const isFunc = typeof data === 'function'
    return isFunc
  }
})

ajv.addKeyword({
  keyword: "isSchema",
  validate: (schema, data) => {
    if (schema !== true) throw new Error('isSchema should be true')

    if(! ajv.validateSchema(schema) ) {
      localize[DEFAULT_LOCALIZE](ajv.errors)
      // ajv.errorsText(validate.errors, params)
      return false
    }
    return true
  }
})

const throwValidatorErrors = (ajvValidator, params = {}) => {
  const schemaText = ajvValidator.schemaName ? ` schema: ${ajvValidator.schemaName }` : ''
  log(`[validation ERR]${schemaText} errors:`, "ERR")
  if (params.item) log(`[validation item] ${JSON.stringify(params.item)}`)
  localize[DEFAULT_LOCALIZE](ajvValidator.errors)
  log(ajvValidator.errorsText(), "INFO")
  log(ajvValidator.errors.map(e => `[ERR] /${e.instancePath}: ${JSON.stringify(e)}` ).join('\n'))

  throw new Error(`[ajvValidator ERR]`)
}

const schemas = {
  "unit-config": require('../schemas/unit-config.json'),
  "build-config": require('../schemas/build-config.json')
}

const check = {}
for (const schemaName in schemas ) {
  check[schemaName] = ajv.compile(schemas[schemaName])
  check[schemaName].schemaName = `./cyber-builder/schemas/${schemaName}.json`
  check[schemaName].errorsText = () => {
    const validate = check[schemaName]
    localize[DEFAULT_LOCALIZE](validate.errors)
    return ajv.errorsText(validate.errors, { separator: '\n' })
  }
}

const coreDependencies = {
  yaml: require('yaml'), 
  lodash,
  ajv, schemas, check, log, throwValidatorErrors
}

module.exports = coreDependencies