const path = require('path');
const config = require('./config');
const recdir = require('./recdir');

const fuzzy = require('./searchers/fuzzy');
const simple = require('./searchers/simple');
const lunr = require('./searchers/lunr');

const pTerm = require('./presentations/term');



// command line args
const subCmd = process.argv[2];
const args = process.argv.splice(3);

const searchTerm = args.join(' ') || '';


function createList () {
  let booklist = [];

  recdir(config.pathBooks, function (fileName) {
    if (fileName.endsWith('pdf') || fileName.endsWith('PDF')) {
      booklist.push({
        name: path.basename(fileName),
        path: `file://${fileName}`,
      });
    }
  });

  return booklist;
}

const booklist = createList();


const subCmdTable = {
  fuzzy,
  f: fuzzy,
  simple,
  s: simple,
  lunr,
  l: lunr,

  default: lunr
};


// const filtered = fuzzy.search(searchTerm, booklist);
// const filtered = simple.search(searchTerm, booklist);
// const filtered = lunr.search(searchTerm, booklist);
const filtered = (subCmdTable[subCmd] || subCmdTable.default).search(searchTerm, booklist);

pTerm.p(filtered);
