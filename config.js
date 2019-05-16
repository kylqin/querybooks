const fs = require('fs')
const os = require('os')

const homeDir = os.homedir()
const userConfigFilePath = `${homeDir}/.bkconf.json`
let config
try {
  const configStr = fs.readFileSync(userConfigFilePath)
  config = configStr && JSON.parse(configStr)
} catch (e) {
  console.log(`Please modify the configuration file \`\x1b[31m${userConfigFilePath}\x1b[0m\`(created it if not
existed), assigning field \`\x1b[31mbooksdir\x1b[0m\` the path where your books located.`)

  // Exit directly
  process.exit(1)
}

if (config) {
  module.exports = config
}
