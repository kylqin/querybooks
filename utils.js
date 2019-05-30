const fs = require('fs')

/*
 * Padding string `length` with char `padWithChar` on left/right side to fit length `length`.
 * @length Number
 * @content except String, or Nubmer
 * @padWithChar Char
 * @return String
 * Examples:
 *   pad(4, 'ho', '-')  => '--ho'
 *   pad('ho', 4, '-')  => 'ho--'
 *   pad('hoo', 2, '-') => 'hoo'
 */
const pad = (length, content, padWithChar = ' ') => {
    let len = length
    let ctt = String(content)
    let left = true
    let padWithStr = ''

    if (typeof length !== 'number') {
        len = content
        ctt = String(length)
        left = false
    }

    if (ctt.length >= len) {
        return ctt
    }

    for (let i = ctt.length; i < len; ++i) {
        padWithStr += padWithChar
    }

    return left ? `${padWithStr}${ctt}` : `${ctt}${padWithStr}`
}

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
  },
  pad,
}