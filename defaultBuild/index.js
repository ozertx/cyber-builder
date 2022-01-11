
const KubApp = {
  "kind": "KubApp",
  "version": "0.1",

  "configSchema": { },
  "stateSchema": { },
  "initialState": { },
  "methods": {

    async init() {
      console.log(this.config)
      return true
    },

    async execute(data, params) {
      console.log(this.config)
      let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
      console.log(rv)
    }

  }
}

const CyberBuilder = {
  "kind": "CyberBuilder",
  "version": "0.1",

  "configSchema": {},
  "stateSchema": {},
  "initialState": {},
  "methods": { }
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
    CyberBuilder, KubApp
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
