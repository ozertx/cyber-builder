const { iterateUnitUpDownAsync } = require('../helpers/unit-iterators')

module.exports = {
  "kind": "CyberBuilder",
  "version": "0.1",

  "configSchema": {},
  "stateSchema": {},
  "initialState": {},
  "methods": { 

    async init() {

      let valid = true

      for( const unitName in this.units) try {
        const result = await iterateUnitUpDownAsync(this.units[unitName], async (unitableObject, upResult) => {
          if (unitableObject.init) {
            const initResult = await unitableObject.init()
            valid = valid && initResult
          }
          return { valid }
        })
      }
      catch(err) {
        this.log(err)
        this.log(err.toString(), "ERR")
        valid = false
      }

      return valid
    },

    async execute(data, params) {
      console.log(this.config)
      let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
      console.log(rv)
    }
  }
}