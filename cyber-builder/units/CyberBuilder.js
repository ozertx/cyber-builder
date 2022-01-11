module.exports = {
  "kind": "CyberBuilder",
  "version": "0.1",

  "configSchema": {},
  "stateSchema": {},
  "initialState": {},
  "methods": { 

    async init() {

      // console.log("-->", Object.getPrototypeOf(this))
      // console.log("--------------------------")


      
      return true
    },

    async execute(data, params) {
      console.log(this.config)
      let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
      console.log(rv)
    }
  }
}