const util = require('util')
const { log } = require('../core/index')

const Unit = class {

  spec = {
    kind: undefined,
    version: undefined,
    name: undefined,
    tags: []
    // refKey if defined
  }
  dependencies = {}
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

  log(t, l, p) {
    log(`[${ this.spec.name }] ${t}`, l, p)
  }

  throwError(err, p) {
    let msg = ''
    if(typeof(err) === 'string') {
      msg = err
    }
    else {
      msg = err.toString()
    }
    this.log(msg, 'ERR', p)
    throw new Error(`[${this.spec.name }] ${msg}`)
  }

}



module.exports = Unit