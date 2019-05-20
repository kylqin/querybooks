const fs = require('fs')
const os = require('os')
const MSG = require('./showMessage')

const homeDir = os.homedir()
const userConfigFilePath = `${homeDir}/.bkconf.json`
let config
try {
  const configStr = fs.readFileSync(userConfigFilePath)
  config = configStr && JSON.parse(configStr)
  config.userConfigFilePath = userConfigFilePath
  config.homeDir = homeDir
} catch (e) {
  MSG.show(MSG.NAME.USER_CONF_INVALID, { userConfigFilePath })

  // Exit directly
  process.exit(1)
}

if (config) {
  module.exports = config
}
