
const PREFIX = '[iterator]'

module.exports.iterateUnitsUpDownSync = (unitableObject, iterateFn, upResult, params = {}) => {
  
  const fnResult = iterateFn(unitableObject, upResult)
  if (typeof (fnResult) != 'object') throw new Error(`${PREFIX} iterateUnitUpDown iterateFn fnResult should be object`)
  
  const result = { units: {} }
  const objectUnits = unitableObject.units || {}
  for (let unitName in objectUnits) {
    result.units[unitName] = module.exports.iterateUnitsUpDownSync(objectUnits[unitName], iterateFn, result, params)
  }
  return result
}


module.exports.iterateUnitsUpDown = async (unitableObject, iterateFn, upResult, params = {}) => {

  const fnResult = await iterateFn(unitableObject, upResult)
  if (typeof (fnResult) != 'object') throw new Error(`${PREFIX} iterateUnitUpDown iterateFn fnResult should be object`)

  const result = { ...fnResult, units: {} }
  const objectUnits = unitableObject.units || {}
  for (let unitName in objectUnits) {
    result.units[unitName] = await module.exports.iterateUnitsUpDown(objectUnits[unitName], iterateFn, result, params)
    // console.log("1",result.units[unitName])
  }
  return result
}


// iterate Flat

module.exports.iterateUnitsFlat = async (unitableObject, iterateFn, upResult, params = {}) => {

  const objectUnits = unitableObject.units || {}
  const result = {}
  for (let unitName in objectUnits) {
    result[unitName] = await iterateFn(unitableObject, upResult)
  }
  return result
}