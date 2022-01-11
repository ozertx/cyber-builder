

const Unit = class {

  spec = {
    kind: undefined,
    version: undefined,
    name: undefined,
    index: undefined
  }
  config = {}
  state = {}
  units = {}

  parentUnit = null
  rootUnit = null

  constructor( unitConfig ) {
    
    this.spec = {
      kind: unitConfig.name.split(':')[1],
      version: "xx",
      name: unitConfig.name,
      index: unitConfig.unitIndex
    }
    this.config = unitConfig    
  }

}


module.exports = Unit