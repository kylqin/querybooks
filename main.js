const path = require('path')
const config = require('./config')
const recdir = require('./recdir')

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

runApp()

function runApp () {
  const ARGS = parseArgs()
  const booklist = createList()

  if (ARGS.subCmd === '-h' || ARGS.subCmd === '--help') {
    return showHelp()
  }
  // const filtered = fuzzy.search(searchTerm, booklist);
  // const filtered = simple.search(searchTerm, booklist);
  // const filtered = lunr.search(searchTerm, booklist);
  const filtered = (subCmdTable[ARGS.subCmd] || subCmdTable.default).search(ARGS.searchTerm, booklist)

  pTerm.p(filtered)
}

function showHelp () {
  console.log(`usage: bk [-h | --help]
       bk {fuzzy | f | lunr | l | simple | s} searchTerm

These are common \`bk\` sub commands used to search books with various search engines:

   fuzzy,  f    Search with fuzzy style
   lunr,   l    Search with lunr.js, a search engine is a bit like Solr
   simple, s    Search with exact match case insensitively
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

  recdir(config.pathBooks, function (fileName) {
    if (fileName.endsWith('pdf') ||
        fileName.endsWith('PDF') ||
        fileName.endsWith('epub') ||
        fileName.endsWith('EPUB')
    ) {
      booklist.push({
        name: path.basename(fileName),
        path: `file://${fileName}`
      })
    }
  })

  return booklist
}
