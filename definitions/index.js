
const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true })

const exportItem = { ajv }
module.exports = exportItem
exportItem.Unit = require('./Unit')
exportItem.UnitBuilder = require('./UnitBuilder')   