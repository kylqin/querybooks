const path = require('path')
const fs = require('fs')
const os = require('os')
const child_process = require('child_process')
const config = require('./config')
const recdir = require('./recdir')
const pjson = require('./package.json')
const MSG = require('./showMessage')
const Utils = require('./utils')

// searchers
const fuzzy = require('./searchers/fuzzy')
const simple = require('./searchers/simple')
const lunr = require('./searchers/lunr')

const { COPYFILE_EXCL } = fs.constants
// presentation styles
// const pTerm = require('./presentations/term')
const pBlessed = require('./presentations/blessed')

const subCmdTable = {
  fuzzy,
  f: fuzzy,
  simple,
  s: simple,
  lunr,
  l: lunr,

  default: lunr
}

const bookformats = (() => {
  return (
    !config.bookformats ||
    typeof config.bookformats !== 'array' ||
    config.bookformats.length === 0
  ) ? ["pdf", "epub", "mobi"] :
  config.bookformats
})()

function isBook (fileName) {
  const splits = fileName.split('.')
  const fileFormat = splits[splits.length - 1]

  return bookformats.indexOf(fileFormat) !== -1
}


function runApp () {
  const ARGS = parseArgs()

  if (!ARGS.subCmd || ARGS.subCmd === '-h' || ARGS.subCmd === '--help') {
    return showHelp()
  }
  if (ARGS.subCmd === '-v' || ARGS.subCmd === '--version') {
    return MSG.show(MSG.NAME.VERSION, { version: pjson.version })
  }
  if (ARGS.subCmd === 'collect' || ARGS.subCmd === 'c') {
    return moveBooksFromTo()
  }

  const booklist = createList()
  // const filtered = fuzzy.search(searchTerm, booklist);
  // const filtered = simple.search(searchTerm, booklist);
  // const filtered = lunr.search(searchTerm, booklist);
  let filtered
  if (subCmdTable[ARGS.subCmd]) {
    filtered = subCmdTable[ARGS.subCmd].search(ARGS.searchTerm, booklist)
  } else {
    const searchTerm = ARGS.subCmd
    filtered = subCmdTable['simple'].search(searchTerm, booklist)
    const filteredLunr = subCmdTable['lunr'].search(searchTerm, booklist)
    filtered = mergeResult(filteredLunr, filtered)
  }

  // pTerm.p(filtered)
  pBlessed.p(filtered)
}

function showHelp () {
  MSG.show(MSG.NAME.HELP, { userConfigFilePath: config.userConfigFilePath })
}

function parseArgs () {
  // command line args
  const subCmd = process.argv[2]
  const args = process.argv.splice(3);
  const searchTerm = args.join(' ') || ''

  return {
    subCmd,
    searchTerm
  }
}

function createList () {
  const booklist = []
  const booksdir = config.booksdir

  checkBooksdir() || process.exit(1)

  try {
    recdir(booksdir, function (fileName) {
      if (isBook(fileName)) {
        booklist.push({
          name: path.basename(fileName),
          path: `file://${fileName}`
        })
      }
    })
  } catch (e) {
    console.log(e)
    // Exit directly
    process.exit(1)
  }

  return booklist
}

function mergeResult (listA, listB) {
  const existsInA = {}
  for (let e of listA) {
    existsInA[e.url] = true
  }
  const result = listA.slice()
  for (let e of listB) {
    if (!existsInA[e.url]) {
      result.push(e)
    }
  }
  return result
}

function moveBooksFromTo () {
  const { collectfrom, booksdir } = config

  checkBooksdir() || process.exit(1)
  checkCollectfrom() || process.exit(1)

  for (let i = 0; i < collectfrom.length; i += 1) {
    try {
      recdir(collectfrom[i], function (fileName) {
        if (isBook(fileName)) {
          try {
            fs.copyFileSync(fileName, path.join(booksdir, path.basename(fileName)), COPYFILE_EXCL)
            child_process.execSync(`rm "${fileName}"`)
          } catch (e) {
            // console.log(e)
            MSG.show(MSG.NAME.MOVE_BOOK_FAIL, { fileName })
            return
          }
          // child_process.execSync(`yes n |mv -i "${fileName}" "${booksdir}"`)
          MSG.show(MSG.NAME.MOVE_BOOK, { fileName })
        }
      })
    } catch (e) {
      console.log(e)
      // Exit directly
      process.exit(1)
    }
  }
}

function checkBooksdir () {
  if (!config.booksdir) {
    MSG.show(MSG.NAME.USER_CONF_INVALID, { userConfigFilePath: config.userConfigFilePath })
    return false
  }
  if (!Utils.isDir(config.booksdir)) {
    MSG.show(MSG.NAME.BOOKSDIR_NOT_EXIST, { booksdir: config.booksdir, userConfigFilePath: config.userConfigFilePath })
    return false
  }
  return true
}

function checkCollectfrom () {
  if (!config.collectfrom || !(config.collectfrom instanceof Array)) {
    MSG.show(MSG.NAME.USER_CONF_COLLECTFROM_INVALIED, { userConfigFilePath: config.userConfigFilePath })
    return false
  }

  const cf = config.collectfrom
  for (let i = 0; i < cf.length; i += 1) {
    if (!Utils.isDir(cf[i])) {
      MSG.show(MSG.NAME.COLLECTFROM_NOT_EXIST, { collectfromDir: cf[i], userConfigFilePath: config.userConfigFilePath })
      return false
    }
  }
  return true
}

module.exports = {
  run: runApp
}
