const { build, log } = require('./cyber-builder')

const buidConfig = require('./defaultBuild')
const monoscope = {}


console.log(`[index] loading buidConfig`)


// mount it
async function start() {
  try {
    let buildResult = await build(monoscope, buidConfig)
    console.log(buildResult)
  }
  catch (err) {
    log("build ERR", "ERR")
    console.log(err)
    console.log(err.toString())
  }
}



try {
  start(buidConfig)
}
catch(err) {
  console.log("system ERR")
  console.log(err)
  process.exit(0)
}


