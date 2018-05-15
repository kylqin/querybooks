const path = require('path');
const fuzzy = require('./searchers/fuzzy');
const simple = require('./searchers/simple');
const recdir = require('./recdir');
const config = require('./config');


// command line args
const args = process.argv.splice(2);

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


// const filtered = fuzzy.search(searchTerm, booklist);
const filtered = simple.search(searchTerm, booklist);



console.log(filtered.map(r => r.string).join('\n'));
