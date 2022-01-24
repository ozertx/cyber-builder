const { log, start } = require('./cyber-builder')


console.log(`[index] loading buidConfig`)

const run = async () => {
  
  
  const Loader = require('./loaders/build-loader')

  const buidConfig = await Loader()

  try {
    start(buidConfig)
  }
  catch(err) {
    log("START ERR")
    log(err)
    process.exit(0)
  }
}
run()

