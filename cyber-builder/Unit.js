
let { ajv } = require('./core')


const Unit = class {

  unitIndex = undefined
  name = undefined
  kind = undefined
  title = undefined
  config = {}
  units = {}

  parentUnit = null
  rootUnit = null


  constructor( unitConfig ) {

    this.unitIndex = unitConfig.unitIndex
    this.name = unitConfig.name
    this.title = unitConfig.name.split(':')[0]
    this.kind = unitConfig.name.split(':')[1]
    this.config = unitConfig

    // if (config['units']) {

    //   for (let unitKey in config['units'] ) {
    //     let unitConfig = config['units'][unitKey]

    //     const [key, className] = unitKey.split(':')
    //     const UnitClass = unitClasses[className] 

    //     if(!UnitClass) {
    //       throw new Error(`unit class ${className} not found in registred unit classes ${Object.keys(unitClasses).join(';') }`)
    //     }

    //     let newUnit = new UnitClass(unitConfig, unitClasses)

    //     newUnit.className = className
    //     newUnit.key = key

    //     this.units[key] = newUnit

    //   }
    // }
    
  }
}


module.exports = Unit