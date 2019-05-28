const fs = require('fs')

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


}