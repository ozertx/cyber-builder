const { start, log } = require('./cyber-builder')
const fs = require('fs')
const path = require('path')

const CONFIG = {
  unitFolders: [
    "./units",
    "./units-definitions",
    "./units2",
    "./units3",
  ],
  buidConfigPath: ""
}


const buidConfig = require('./defaultBuild')
const monoscope = {}


console.log(`[index] loading buidConfig`)


try {
  start(buidConfig)
}
catch(err) {
  log("START ERR", 'ERR')
  log(err), 'ERR'
  process.exit(0)
}


