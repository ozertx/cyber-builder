

let { ajv, schemas } = require('./core')


const buildConfigSchema = schemas['build-config']


const UnitBuilder = class {

  buildConfig = {}
  scope = {}
  params = {}
  log = console.log

  build() {

    const { buildUnit } = this.buildConfig
    const newUnit = new Unit(buildUnit, { ...this.buildConfig.unitsClasses } )

    return newUnit
  }


  constructor(scope, buidConfig, params ) {
    const { ajv } = scope

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