const fs = require('fs')
const path = require('path')

const recdir = function (pathDir, action) {
  const stats = fs.statSync(pathDir)
  if (stats.isDirectory()) {
    const contents = fs.readdirSync(pathDir)
    // console.log(contents);
    for (const c of contents) {
      recdir(path.join(pathDir, c), action)
    }
  } else {
    action(pathDir)
  }
}

module.exports = recdir
