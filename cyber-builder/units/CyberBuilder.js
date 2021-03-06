const { iterateUnitsUpDown } = require('../helpers/unit-iterators')

module.exports = {
  "kind": "CyberBuilder",
  "version": "0.1",

  "configSchema": {},
  "stateSchema": {},
  "initialState": {},
  "methods": { 

    async init() {
      const initResult = await this.iterateMethodCall('init')
      let valid = true
      for (const unitName in initResult.units) {
        if (initResult.units[unitName].error) {
          this.units[unitName].log(`${initResult.units[unitName].error}`, 'ERR')
          valid = false
        }
      }

      if (!valid) this.throwError('some units init fail')
    },

    async start() {
      const initResult = await this.iterateMethodCall('start')
      let valid = true
      for (const unitName in initResult.units) {
        if (initResult.units[unitName].error) {
          this.units[unitName].log(`${initResult.units[unitName].error}`, 'ERR')
          valid = false
        }
      }

      if (!valid) this.throwError('some units start fail')
    },

    async iterateMethodCall(methodName, p1, p2, params = {} ) {

      const result = { units: {} }

      for (const unitName in this.units) try {
        const iterateResult = await iterateUnitsUpDown(this.units[unitName], async (unitableObject, upResult) => {
          if (unitableObject[methodName]) {
            const methodResult = await unitableObject[methodName](p1, p2)
            return { result: methodResult }
          }
          return { }
        })
        result.units[unitName] = iterateResult
      }
      catch (err) {
        result.units[unitName] = {
          error: err.toString(),
          err
        }
      }

      return result

    },
    
    async execute(data, params) {
      console.log(this.config)
      let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
      console.log(rv)
    },


    getUnit(unitName) {
      return this.units[unitName]
    }

  }
}