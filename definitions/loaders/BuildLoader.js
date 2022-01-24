


const BuildLoader = {
  "kind": "BuildLoader",
  "version": "0.1",

  "configSchema": {
    "type": "object",
    "required": ["definitionsFolders", "buildConfigPath1"]
  },
  "stateSchema": {},
  "initialState": {
    buildConfig:null,
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
      return this.buildConfig
    }

  }
}



module.exports = { BuildLoader }