


// Will be Unit


module.exports = class KubApp {

  // static configSchema = 

  async init() {
    console.log(this.config)
    return true
  }

  async execute(data,params) {
    console.log(this.config)
    let rv = yaml.stringify({ aaa:1 , bbb:"dsdsd", ccc: { dfddf:2} })
    console.log(rv)
  }
    
}
