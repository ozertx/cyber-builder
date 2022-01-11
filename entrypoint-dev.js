const { log, start } = require('./cyber-builder')

const buidConfig = require('./defaultBuild')

console.log(`[index] loading buidConfig`)

try {
  start(buidConfig)
}
catch(err) {
  log("START ERR")
  log(err)
  process.exit(0)
}
