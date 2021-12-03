const { build } = require('./cyber-builder')

const buidConfig = require('./defaultBuild')
const monoscope = {}


console.log(`[index] loading buidConfig`)


// mount it
async function start() {
  let buildResult = await build(monoscope, buidConfig)


  console.log(`[index] started`)

  console.log(buildResult)

}


try {
  start(buidConfig)
}
catch(err) {
  console.log("system ERR")
  console.log(err)
  process.exit(0)
}


