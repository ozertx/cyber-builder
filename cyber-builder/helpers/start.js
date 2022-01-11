const { build, log } = require('..')

const monoscope = {}

module.exports = async function start(buidConfig) {

  try {
    let buildResult = await build(monoscope, buidConfig)

    // console.log(Object.keys(buildResult))
    
    // log(buildResult)
    log("buildResult ------------")
    log("init ------------")
    try {
      await buildResult.init()
    }
    catch(err) {
      log(err.toString(), "ERR")
      log("INIT FAIL", "ERR")
      process.exit(0)
    }
    log("inited ------------")
    log("start ------------")
    try {
      await buildResult.start()
      
    }
    catch (err) {
      log(err.toString(), "ERR")
      log("START FAIL", "ERR")
      process.exit(0)
    }
    log("ON AIR! ------------")
    
  }
  catch (err) {
    log("build ERR", 'ERR')
    log(err)
    log(err.toString(), 'ERR')
  }

}

