const { log, start } = require('./cyber-builder')

const PREFIX = '[entrypoint]'

log(`${PREFIX} start dev`)

const run = async () => {
  
  
  const Loader = require('./loaders/build-loader')
  let buidConfig
  
  try {
    buidConfig = await Loader() 
  }
  catch (err) {
    log(`${PREFIX} Config load ERR. ${err.toString()}`, 'ERR')
    process.exit(0)
  }


  try {
    start(buidConfig)
  }
  catch(err) {
    log(`${PREFIX} START ERR. ${err.toString()}`)
    process.exit(0)
  }
}
run()

