const util = require('util')
const { log } = require('../core/index')
const unitIterators = require('../helpers/unit-iterators')

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



// Apply iterators to constructor FN
for( const itName in unitIterators) {
  const iterator = unitIterators[itName]

  if(typeof(iterator) !== 'function') continue

  if(iterator[Symbol.toStringTag] === 'AsyncFunction') {
    Unit[itName] = async (...args) => {
      return await iterator(this, ...args)
    }
  }
  else {
    Unit[itName] = (...args) => {
      args[0] = this
      return iterator(this, ...args)
    }
  }
}

module.exports = Unit