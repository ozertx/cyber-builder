
const PREFIX = '[iterator]'

module.exports.iterateUnitUpDown = (unitableObject, iterateFn, upResult, params = {}) => {
  
  const fnResult = iterateFn(unitableObject, upResult)
  if (typeof (fnResult) != 'object') throw new Error(`${PREFIX} iterateUnitUpDown iterateFn fnResult should be object`)
  
  const result = { units: {} }
  const objectUnits = unitableObject.units || {}
  for (let unitName in objectUnits) {
    result.units[unitName] = module.exports.iterateUnitUpDown(objectUnits[unitName], iterateFn, result, params)
  }
  return result
}


module.exports.iterateUnitUpDownAsync = async (unitableObject, iterateFn, upResult, params = {}) => {

  const fnResult = await iterateFn(unitableObject, upResult)
  if (typeof (fnResult) != 'object') throw new Error(`${PREFIX} iterateUnitUpDown iterateFn fnResult should be object`)

  const result = { ...fnResult, units: {} }
  const objectUnits = unitableObject.units || {}
  for (let unitName in objectUnits) {
    result.units[unitName] = await module.exports.iterateUnitUpDownAsync(objectUnits[unitName], iterateFn, result, params)
    // console.log("1",result.units[unitName])
  }
  return result
}
