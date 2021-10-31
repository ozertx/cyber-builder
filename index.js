
const monoScope = require('./monoScope')
const { baseDefinitions } = monoScope

console.log(`[index] loading buidConfig`)


// mount it
const buidConfig = require('./defaultBuild')


function validateUnitsClasses(unitsClasses) {



}


async function start(buidConfig) {
  const { hooks, unitsClasses } = buidConfig



  for (let unitKey in unitsClasses) {
    const Class = unitsClasses[unitKey]

    console.log(Object.getOwnPropertyNames(Class) )


    if (Class === baseDefinitions.Unit) continue

    if (!Class.configSchema) {
            
    }

  }
 

  console.log(`[start] loading buidConfig`)

  const { UnitBuilder } = monoScope

  console.log(`[start] create cyberBuilder`)

  const cyberBuilder = new UnitBuilder(buidConfig, monoScope)

  console.log(`[start] build system`)

  let buildedSystem = cyberBuilder.build()

  if (hooks.afterBuild) {
    hooks.afterBuild(buildedSystem)
  }

  // console.log(`[start] system init`)

  // await buildedSystem.init()

  // console.log(`[start] system start`)


  // await buildedSystem.start()

  // console.log(`[start] finish OK`)


}

try {
  start(buidConfig)
}
catch(err) {
  console.log("system ERR")
  console.log(err)
  process.exit(0)
}


