QueryBooks
----

`bk` is a command line tool to search books in local directory by file name.

## Installation

```sh
$ [sudo] npm install -g querybooks
```

## Setup

Before using `bk`, you have to config your books directory. Open the user configuration file `$HOME/.bkconf.json` and add the field `booksdir`. Here is an example:

```json
{
    "booksdir": "/Users/kylqin/Documents/books",
    "bookformats": ["pdf", "epub" ,"mobi"]
}
```

## Usage

Execute following command to get the usage:

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

Note that you can open the book by clicking the blue block with holding Command (for MacOS) or Ctrl ( for Linux) key.
<br/>
<br/>
![](https://github.com/qinxij/querybooks/blob/master/screenshots/bk-screenshots01.png?raw=true)
<br/>
<br/>
![](https://github.com/qinxij/querybooks/blob/master/screenshots/bk-screenshots02.png?raw=true)

## License
MIT