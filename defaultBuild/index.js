
// const CyberBuilder = require('../cyber-builder/units/Cyberbuilder.js')
const CyberBuilder = require('../cyber-builder/units/CyberBuilder')

const KubApp = {
  "kind": "KubApp",
  "version": "0.1",

  "configSchema": { },
  "stateSchema": { },
  "initialState": { },
  "methods": {

    async init() {

      if( Math.random()*10>5) throw new Error("dev init error")
      this.log(`--> ${JSON.stringify(this.spec)}`)

      return true
    },

    async start() {

      if (Math.random() * 10 > 5) throw new Error("dev start error")
      this.log(`--> ${JSON.stringify(this.spec) }` )
      return true
    },

    async execute(data, params) {
      this.log(this.config)
      let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
      this.log(rv)
    }

  }
}



const hooks = {
  afterBuild: async (buildedUnit) => {

    let result = {}

    const { app } = buildedUnit.units
    
    const appmodel = await app.execute()

    console.log('appmodel', appmodel)

  }
}



const buildConfig = {
  kindsDefinition: {
    CyberBuilder, 
    KubApp
  },
  hooks,
  build: {
    "name": "cyberBuilder:CyberBuilder",
    "units": {
      "app:KubApp": {
        "indexKey": "kubapp"


      }
    }
  }
}

module.exports = buildConfig
