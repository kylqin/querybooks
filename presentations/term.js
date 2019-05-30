const Utils = require('../utils')
const config = require('../config')
const path = require('path')
const os = require('os')

const UserHomePath = os.homedir()

const { darkgray, _lightblue } = Utils.color

module.exports = {
  p: function (filtered) {
    console.log(filtered.map(
//       r => `${r.string}
// ${darkgray(` => "${r.url.slice(7, -4)}`)}${_lightblue(r.url.slice(-4).toUpperCase())}${darkgray('"')}`
      // r => {
      //   const url = darkgray('"' + path.join(config.booksdir, '-').slice(0, -1)) + r.string
      //   return `${url.slice(0, -4)}${_lightblue(url.slice(-4).toUpperCase())}${darkgray('"')}`
      // }
      r => {
        const dirName = path.dirname(r.url.slice(7)).replace(UserHomePath, '~')
        // const dirName = path.dirname(r.url.slice(7)).replace(config.booksdir, '$BKSD')
        const url = darkgray('"' + path.join(dirName, '-').slice(0, -1)) + r.string
        return `${url.slice(0, -4)}${_lightblue(url.slice(-4).toUpperCase())}${darkgray('"')}`
      }
    ).join('\n'))
  }
}
