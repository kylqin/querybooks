const path = require('path')
const os = require('os')
const config = require('./config')
const recdir = require('./recdir')
const pjson = require('./package.json')
const MSG = require('./showMessage')

// searchers
const fuzzy = require('./searchers/fuzzy')
const simple = require('./searchers/simple')
const lunr = require('./searchers/lunr')

// presentation styles
const pTerm = require('./presentations/term')

const subCmdTable = {
  fuzzy,
  f: fuzzy,
  simple,
  s: simple,
  lunr,
  l: lunr,

  default: lunr
}

function runApp () {
  const ARGS = parseArgs()

  if (ARGS.subCmd === '-h' || ARGS.subCmd === '--help') {
    return showHelp()
  }
  if (ARGS.subCmd === '-v' || ARGS.subCmd === '--version') {
    return MSG.show(MSG.NAME.VERSION, { version: pjson.version })
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
    filtered = mergeResult(filtered, filteredLunr)
  }

  pTerm.p(filtered)
}

function showHelp () {
  MSG.showMsg(MSG.MSGNAME.HELP, { userConfigFilePath: config.userConfigFilePath })
}

function parseArgs () {
  // command line args
  const subCmd = process.argv[2]
  const args = process.argv.splice(3)
  const searchTerm = args.join(' ') || ''

  return {
    subCmd,
    searchTerm
  }
}

function createList () {
  const booklist = []
  const booksdir = config.booksdir
  const bookformats = (
      !config.bookformats ||
      typeof config.bookformats !== 'array' ||
      config.bookformats.length === 0
    ) ? ["pdf", "epub", "mobi"] :
    config.bookformats

  try {
    recdir(booksdir, function (fileName) {
      const splits = fileName.split('.')
      const fileFormat = splits[splits.length - 1]

      if (bookformats.indexOf(fileFormat) !== -1) {
        booklist.push({
          name: path.basename(fileName),
          path: `file://${fileName}`
        })
      }
    })
  } catch (e) {
    if (!booksdir) {
      MSG.showMsg(MSG.MSGNAME.USER_CONF_INVALID, { userConfigFilePath: config.userConfigFilePath })
    } else {
      MSG.showMsg(MSG.MSGNAME.BOOKSDIR_NOT_EXIST, { booksdir, userConfigFilePath: config.userConfigFilePath })
    }

    // Exit directly
    process.exit(1)
  }

  return booklist
}

function mergeResult (listA, listB) {
  const existsInA = {}
  for (let e in listA) {
    existsInA[e.url] = true
  }
  const result = listA.slice()
  for (let e in listB) {
    if (!existsInA[e.url]) {
      result.push(e)
    }
  }
  return result
}

module.exports = {
  run: runApp
}
