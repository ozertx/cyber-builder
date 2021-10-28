
const monoScope = require('./monoScope')

console.log(`[index] loading buidConfig`)


// mount it
const buidConfig = require('./defaultBuild')



async function start(buidConfig) {

  console.log(`[start] loading buidConfig`)

  const { UnitBuilder } = monoScope

  console.log(`[start] create cyberBuilder`)

  const cyberBuilder = new UnitBuilder(buidConfig, monoScope)

  console.log(`[start] build system`)

  let buildedSystem = cyberBuilder.build()

  console.log(`[start] system init`)

  await buildedSystem.init()

  console.log(`[start] system start`)


  await buildedSystem.start()

  console.log(`[start] finish OK`)


}

try {
  start(buidConfig)
}
catch(err) {
  console.log("system ERR")
  console.log(err)
  process.exit(0)
}


