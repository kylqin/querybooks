const fs = require('fs')

// see: https://misc.flogisoft.com/bash/tip_colors_and_formatting
const CL = {
  // _Lightblue: '\x1b[104m',
  _Lightblue: '\x1b[34m\x1b[1m',
  Darkgray: '\x1b[90m',
  Red: '\x1b[31m',
  Blue: '\x1b[34m',
  Green: '\x1b[32m',
  End: '\x1b[0m',
}

module.exports = {
  isDir: function isDir(p) {
    if (!fs.existsSync(p)) {
      return false
    }
    if (!fs.statSync(p).isDirectory()) {
      return false
    }
    return true
  },

  color: {
    NAME: CL,
    red: str => `${CL.Red}${str}${CL.End}`,
    blue: str => `${CL.Blue}${str}${CL.End}`,
    green: str => `${CL.Green}${str}${CL.End}`,
    darkgray: str => `${CL.Darkgray}${str}${CL.End}`,
    _lightblue: str => `${CL._Lightblue}${str}${CL.End}`
  }

}