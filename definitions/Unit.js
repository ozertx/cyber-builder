


const Unit = class {

  config = {}
  className = 'noname'
  key = ''
  units = {}

  async init() {

    console.log('--', this.name)

    for (let key in this.units ) {
      const unit = this.units[key] 
      await unit.init()
    }

    return true
  }

  constructor( config, unitClasses ) {

    this.config = config
    
    if (config['units']) {

      for (let unitKey in config['units'] ) {
        let unitConfig = config['units'][unitKey]

        console.log("unitConfig", unitConfig)

        const [key, className] = unitKey.split(':')
        const UnitClass = unitClasses[className] 

        if(!UnitClass) {
          throw new Error(`unit class ${className} not found in registred unit classes ${Object.keys(unitClasses).join(';') }`)
        }

        let newUnit = new UnitClass(unitConfig, unitClasses)

        newUnit.className = className
        newUnit.key = key

        this.units[key] = newUnit

      }
    }
    
  }
}


module.exports = Unit