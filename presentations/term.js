const Utils = require('../utils')

const { darkgray, _lightblue } = Utils.color

module.exports = {
  p: function (filtered) {
    console.log(filtered.map(
      r => `${r.string}
${darkgray(` => "${r.url.slice(7, -4)}`)}${_lightblue(r.url.slice(-4))}${darkgray('"')}`
    ).join('\n'))
  }
}
