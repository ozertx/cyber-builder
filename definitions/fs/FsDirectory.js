const fs = require('fs').promises

const BuildLoader = {
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
      if (! await fs.exists(path)) this.throwError(`Path '${path}' not exist.`)

      const lstat = await fs.lstat(path) 

      if (!lstat.isDirectory()) this.throwError(`Path '${path}' is not directory.`)
    }

  }
}



module.exports = { BuildLoader }