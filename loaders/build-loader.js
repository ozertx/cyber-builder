'use strict'

const { BuildLoader } = require('../definitions/loaders/BuildLoader')
const { FsDirectory } = require('../definitions/fs/FsDirectory')
const { build, log, ajv, throwValidatorErrors } = require('../cyber-builder')

const hooks = { }

const loadConfig = async (config) => {

  if (!ajv.validate(BuildLoader.configSchema, config)) throwValidatorErrors(ajv)

  const loaderUnits = {}

  let cnt = 0
  for (const path of config.definitionsFolders) {
    const key = `folder-${cnt++}:FsDirectory`
    loaderUnits[key] = { path }
  } 

  
  const loaderConfig = {
    kindsDefinition: {
      BuildLoader, FsDirectory
    },
    hooks,
    build: {
      "name": "buildLoader:CyberBuilder",
      "units": {
        "loader:BuildLoader": {
          ...config,
          "units": loaderUnits
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
