


const BuildLoader = {
  "kind": "BuildLoader",
  "version": "0.1",

  "configSchema": {
    "type": "object",
    "required": ["definitionsFolders", "buildConfigPath"],
    "properties": {
      "definitionsFolders": {},
      "buildConfigPath": {}
    }
  },
  "stateSchema": {},
  "initialState": {
    buildConfig:null,
  },
  "dependencies": {
    "definitionsFolders": {
      "multiply": true,
      "expectedKind": "FsDirectory"
    }
  },
  "methods": {

    async init() {

      this.buildConfig = {
        kindsDefinition: {
          BuildLoader
        },
        // hooks,
        build: {
          "name": "cyberBuilder:CyberBuilder",
          "units": {
          }
        }
      }

    },


    async execute(data, params) {
      console.log(this)

      console.log(Object.getPrototypeOf(this))
      console.log(Object.keys(this))

      this.iterateUnitsFlat( (unit) => {

        console.log(unit.spec)

      })

      return this.buildConfig
    }

  }
}



module.exports = { BuildLoader }