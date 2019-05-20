const path = require('path')
const os = require('os')
const config = require('./config')
const recdir = require('./recdir')
const pjson = require('./package.json')

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
    return console.log('v' + pjson.version)
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
  console.log(`Usage: bk {-h | --help | -v | --version}
       bk [fuzzy | f | lunr | l | simple | s] searchTerm

Options:
   --help, -h      Show this infomation
   --version, -v   Show version

These are common sub commands used to search books with various search engines:

   fuzzy,  f       Search with fuzzy style
   lunr,   l       Search with lunr.js, a search engine which is like Solr
   simple, s       Search with exact match case insensitively
   <searchTerm>    Same search with both simple and lunr sub commands

Please modify the configuration file \`${os.homedir()}/.bkconf.json\` (created it if not
existed), assigning the field \`booksdir\` the path where your books located.
  `)
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
  let booklist = []

  try {
    recdir(config.booksdir, function (fileName) {
      const splits = fileName.split('.')
      const fileFormat = splits[splits.length - 1]

      if (config.bookformats.indexOf(fileFormat) !== -1) {
        booklist.push({
          name: path.basename(fileName),
          path: `file://${fileName}`
        })
      }
    })
  } catch (e) {
    console.log(`The bookdir directory \`\x1b[31m${config.booksdir}\x1b[0m\` dose not exist. Please config it in \`\x1b[31m${os.homedir()}/.bkconf.json.\x1b[0m\``)

    // Exit directly
    process.exit(1)
  }

return booklist
}

module.exports = {
  run: runApp
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