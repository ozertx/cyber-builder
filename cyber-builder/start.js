const { build, log } = require('.')

const monoscope = {}

module.exports = async function start(buidConfig) {

  try {
    let buildResult = await build(monoscope, buidConfig)
    log(buildResult)
    console.log(Object.keys(buildResult))
  }
  catch (err) {
    log("build ERR", 'ERR')
    log(err)
    log(err.toString(), 'ERR')
  }

}

