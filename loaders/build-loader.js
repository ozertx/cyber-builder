'use strict'

const { BuildLoader } = require('../definitions/loaders/BuildLoader')
const config = require('./default-config-loader.json')
const { build, log } = require('../cyber-builder')


const hooks = { }


const loadConfig = async () => {

  const loaderConfig = {
    kindsDefinition: {
      BuildLoader
    },
    hooks,
    build: {
      "name": "buildLoader:CyberBuilder",
      "units": {
        "loader:BuildLoader": {
          ...config
        }
      }
    }
  }


  const configBuilder = await build(loaderConfig)
  await configBuilder.init()

  const buildConfig = await configBuilder.getUnit('loader:BuildLoader').execute()

  configBuilder.log(`builded OK`)

  return buildConfig
}

module.exports = loadConfig
