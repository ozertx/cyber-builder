const { ajv, check, log, throwValidatorErrors } = require('./core')
const Unit = require('./Unit')


module.exports = async (scope, buildConfig ) => { 
  if (!scope) throw new Error('Scope is not defined')
  if (!buildConfig) throw new Error('buildConfig is not defined')

  // validate configs here

  buildConfig.build['unitIndex'] = 'root'
  buildConfig.build.name = 'root:root'

  if (!check['build-config'](buildConfig)) throwValidatorErrors(check['build-config'])

  const { build: buildUnit } = buildConfig

  if (!check['unit-config'](buildUnit)) throwValidatorErrors(check['unit-config'])

  // BUILDING OBJECTS


  // fix names
  iterateUnitsDownUp(buildUnit, (unitConfig) => {
    const units = unitConfig.units || {}
    for (let unitName in units)  units[unitName].name = unitName 
  })


  // mk items
  const rootUnitIndex = {}
  let rootUnit = null
  const resultItem = iterateUnitsUpDown(buildUnit, (unitConfig, parentResult) => {

    const { unitIndex, name: unitName } = unitConfig
    if (rootUnitIndex[unitIndex]) {
      throw new Error(`unit ${unitConfig.name}, have alredy declared index: ${unitIndex}`)
    }
    
    const newUnit = new Unit(unitConfig)
    rootUnitIndex[unitIndex] = newUnit

    if(!parentResult) { 
      rootUnit = newUnit
    }
    else {
      newUnit.parentUnit = parentResult
      parentResult.units[unitName] = newUnit
    }
    newUnit.rootUnit = rootUnit

    return newUnit
  })

  resultItem.index = rootUnitIndex

  return resultItem
}

function iterateUnitsDownUp(unitConfig, iterateFn, params = {}) {

  const units = unitConfig.units || {}
  let result = {}
  for (let unitName in units) {
    result[unitName] = iterateUnitsDownUp(units[unitName], iterateFn, params)
  }
  result = iterateFn(unitConfig, result)

  return result
}

function iterateUnitsUpDown(unitConfig, iterateFn, upResult, params = {}) {

  const units = unitConfig.units || {}
  let result = {}
  result = iterateFn(unitConfig, upResult)
  for (let unitName in units) {
    result[unitName] = iterateUnitsUpDown(units[unitName], iterateFn, result, params)
  }

  return result
}



async function iterateUnitsAsync (unitConfig, iterateFn ) {

  const units = unitConfig.units || {}
  const result = {}
  for (let unitName in units ) {
    result[unitName] = await iterateUnitsAsync(units[unitName], iterateFn)
  }
  iterateFn(result)

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
