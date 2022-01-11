const { build, log } = require('..')

const monoscope = {}

module.exports = async function start(buidConfig) {

  try {
    let buildResult = await build(monoscope, buidConfig)

    // console.log(Object.keys(buildResult))
    
    log(buildResult)
    log("buildResult ------------")
    log("init ------------")
    if( ! await buildResult.init() ) {
      log("init fail", "ERR")
    }
    log("inited ------------")

    
  }
  catch (err) {
    log("build ERR", 'ERR')
    log(err)
    log(err.toString(), 'ERR')
  }

}

