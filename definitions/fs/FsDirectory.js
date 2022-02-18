const fs = require('fs').promises

const FsDirectory = {
  "kind": "FsDirectory",
  "version": "0.1",

  "configSchema": {
    "type": "object",
    "required": [ "path" ],
    "properties": {
      "path": {},
      "buildConfigPath": {}
    },
    "additionalProperties": false
  },
  "stateSchema": {},
  "initialState": { },
  "methods": {

    async init() {
      const { path } = this.config
      
      stat = await fs.stat(path).catch( err => this.throwError(`INIT ${err.toString()}`) )

      if (!stat.isDirectory()) this.throwError(`INIT Error: Path '${path}' is not directory.`)
    },

    async load() {

    }
  }
}



module.exports = { FsDirectory }