QueryBooks
----

A command line tool to search books in local directory by file names.

## Installation

```sh
$ [sudo] npm install -g querybooks
```

## Usage

Before you use it to search books, you need config the path your books are located. Open the user configuration file `$HOME/.bkconf.json` and modify the field `booksdir`. Here is an example user configuration file:

```json
{
    "booksdir": "/Users/kylqin/Documents/books",
    "bookformat": "pdf,epub,mobi"
}
```

Execute following comamnd the get help about the command line tool `bk`:

```sh
$ bk --help
usage: bk [-h | --help]
       bk {fuzzy | f | lunr | l | simple | s} searchTerm

These are common `bk` sub commands used to search books with various search engines:

   fuzzy,  f    Search with fuzzy style
   lunr,   l    Search with lunr.js, a search engine is a bit like Solr
   simple, s    Search with exact match case insensitively

Please modify the configuration file `/Users/timber/.bkconf.json` (created it if not
existed), assigning the field `booksdir` to the path where your books located.
```

## Screenshots

![]()
![]()