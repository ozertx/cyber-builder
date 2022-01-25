const { ajv, check, log, throwValidatorErrors, lodash: { cloneDeep } } = require('../core')
const Unit = require('../units/Unit')
const CyberBuilder = require('../units/CyberBuilder')

const PREFIX = `[build]`

module.exports = async ( buildConfig ) => { 
  // if (!scope) throw new Error('Scope is not defined')
  if (!buildConfig) throw new Error(`${PREFIX} buildConfig is not defined`)

  
  // validate configs here
  
  if (!check['build-config'](buildConfig)) throwValidatorErrors(check['build-config'])
  
  const { build: buildUnit } = buildConfig
  
  if (!check['unit-config'](buildUnit)) throwValidatorErrors(check['unit-config'])
  
  buildConfig['kindsDefinition']['CyberBuilder'] = CyberBuilder
  // BUILDING OBJECTS
  
  
  // fix names
  iterateUnitsDownUp(buildUnit, (unitConfig) => {
    const units = unitConfig.units || {}
    for (let unitName in units)  units[unitName].name = unitName 
  })
  
  
  // mk items
  const tagSelectorIndex = {}
  const unitRefs = {}
  let rootUnit = null
  const resultItem = iterateUnitsUpDown(buildUnit, (unitConfig, parentResult) => {
    
    const { tags, refKey, name: unitName } = unitConfig

    const newUnit = new Unit(unitConfig)

    newUnit.spec.tags = tags || []

    for (const tag of newUnit.spec.tags) {
      if (tagSelectorIndex[tag]) tagSelectorIndex[tag].push(newUnit)
      else tagSelectorIndex[tag] = [ newUnit ]
    }

    if (refKey) {
      if (unitRefs[refKey]) throw new Error(`${PREFIX} unit ${unitConfig.name}, have alredy declared ref: ${refKey}`)
      newUnit.spec.refKey = refKey
      unitRefs[refKey] = newUnit
    }
    
    if(!parentResult) { 
      rootUnit = newUnit
    }
    else {
      newUnit.links.parent = parentResult
    }
    newUnit.links.root = rootUnit
    
    return newUnit
  })


  resultItem.tagSelector = tagSelectorIndex
  resultItem.ref = unitRefs
  
  // init methods & state
  const { kindsDefinition } = buildConfig
  iterateUnitsUpDown(resultItem, (unit, parentResult) => {
    
    const { name, kind } = unit.spec

    const KindDefinition = kindsDefinition[kind]
    if (!KindDefinition) throw new Error(`${PREFIX} unit ${name}, kind:${kind } not found in kindsDefinition`)

    
    unit.spec.version = KindDefinition.version
    
    // check schema
    const configSchema = KindDefinition.configSchema
    const { config } = unit
    if (!ajv.validate(configSchema, config)) {
      log(`${PREFIX} unit:${name} config validation err`,'ERR')
      throwValidatorErrors(ajv)
    }

    // mk methods
    for (const methodName in KindDefinition.methods ) {
      unit[methodName] = KindDefinition.methods[methodName]
    }
    
    // initialState
    const initialState = KindDefinition.initialState || {}
    for (const stateName in initialState) {
      unit[stateName] = KindDefinition.methods[stateName]
    }

    return {}
  })
  

  // init dependencies
  iterateUnitsUpDown(resultItem, (unit, parentResult) => {

    const { name, kind } = unit.spec

    const KindDefinition = kindsDefinition[kind]
    if (!KindDefinition) throw new Error(`${PREFIX} unit ${name}, kind:${kind} not found in kindsDefinition`)


    unit.spec.version = KindDefinition.version

    // check schema
    const configSchema = KindDefinition.configSchema
    const { config } = unit
    if (!ajv.validate(configSchema, config)) {
      log(`${PREFIX} unit:${name} config validation err`, 'ERR')
      throwValidatorErrors(ajv)
    }

    // mk methods
    for (const methodName in KindDefinition.methods) {
      unit[methodName] = KindDefinition.methods[methodName]
    }

    // initialState
    const initialState = KindDefinition.initialState || {}
    for (const stateName in initialState) {
      unit[stateName] = KindDefinition.methods[stateName]
    }

    return {}
  })


  resultItem.state = {}
  
  return resultItem
}


// DECLARATIONS ----------------

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

  const configUnits = unitConfig.units || {}

  const result = iterateFn(unitConfig, upResult)
  result.units = {}
  for (let unitName in configUnits) {
    result.units[unitName] = iterateUnitsUpDown(configUnits[unitName], iterateFn, result, params)
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

}
