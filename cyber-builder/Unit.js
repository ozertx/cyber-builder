

const Unit = class {

  spec = {
    kind: undefined,
    version: undefined,
    name: undefined
    // indexKey if defined
  }
  config = {}
  state = {}
  units = {}
  links = {
    parent: null,
    root: null
  }

  constructor( unitConfig ) {
    
    this.spec = {
      kind: unitConfig.name.split(':')[1],
      name: unitConfig.name,
    }
    this.config = unitConfig    
  }

}


module.exports = Unit