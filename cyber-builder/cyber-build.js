const { ajv, check } = require('./core')


module.exports = async (scope, buildConfig ) => { 
  if (!scope) throw new Error('Scope is not defined')
  if (!buildConfig) throw new Error('buildConfig is not defined')

  // validate configs here

  if (!check['build-config'](buildConfig)) {
    console.log(check['build-config'].errors)
    throw new Error(`[build ERR]`)
  }

  const { build } = buildConfig

  if (!check['unit-config'](build)) {
    console.log(check['unit-config'].errors)
    throw new Error(`[build ERR]`)
  }

  // BUILDING OBJECTS

  

  let result = {}


  return result
}

async function iterateUnits (unitConfig, iterateFn ) {

  const units = unitConfig.units || {}
  const result = {}
  iterateFn()
  for (let unitName in units ) {
    result[unitName] = await iterateUnits(units[unitName], iterateFn)
  }

  return result
}



async function start(buidConfig) {
  const { hooks, unitsClasses } = buidConfig



  for (let unitKey in unitsClasses) {
    const Class = unitsClasses[unitKey]

    console.log(Object.getOwnPropertyNames(Class))


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
