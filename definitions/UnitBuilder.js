
const unitConfigSchema = require('./unitConfigSchema.json')
const buildConfigSchema = require('./buildConfigSchema.json')


const { Unit, ajv } = require('./')

const UnitBuilder = class {

  buildConfig = {}
  scope = {}
  params = {}
  unitClasses = { Unit }
  log = console.log

  build() {

    const { buildUnit } = this.buildConfig
    const newUnit = new Unit(buildUnit, { ...this.unitClasses } )

    return newUnit
  }


  constructor(buidConfig, scope, params ) {

    if (!buidConfig) throw new Error('no build config')
    if (params) this.params = params
    if (scope) this.scope = scope
    
    this.buildConfig = buidConfig

    if (!ajv.validate(buildConfigSchema, buidConfig) ) {
      this.log(ajv.errors)
      throw new Error('buidConfig validation error')
    }

  }
}

module.exports = UnitBuilder