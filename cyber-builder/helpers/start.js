const { build, log } = require('..')

const monoscope = {}

module.exports = async function start(buidConfig) {

  try {
    let buildResult = await build(monoscope, buidConfig)

    // console.log(Object.keys(buildResult))
    
    log(buildResult)
    log("buildResult ------------")
    log("init ------------")
    await buildResult.init()
    
  }
  catch (err) {
    log("build ERR", 'ERR')
    log(err)
    log(err.toString(), 'ERR')
  }

}

