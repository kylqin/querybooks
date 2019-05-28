const Utils = require('./utils')

const { red, green } = Utils.color

const NAME = {
  HELP: 'HELP',
  VERSION: 'VERSION',
  USER_CONF_INVALID: 'USER_CONF_INVALID',
  BOOKSDIR_NOT_EXIST: 'BOOKSDIR_NOT_EXIST',
  USER_CONF_COLLECTFROM_INVALIED: 'USER_CONF_COLLECTFROM_INVALIED',
  COLLECTFROM_NOT_EXIST: 'COLLECTFROM_NOT_EXIST',
  MOVE_BOOK: 'MOVE_BOOK',
}

const MSG = {
  [NAME.USER_CONF_INVALID]: (args) => `Please modify the configuration file \`${red(args.userConfigFilePath)}\`(created it if not
existed), assigning field \`${red('booksdir')}\` the path where your books located.`,

  [NAME.BOOKSDIR_NOT_EXIST]: (args) => `The bookdir directory \`\${red(args.booksdir)}\` dose not exist. Please config it in \`${red(args.userConfigFilePath)}\`.`,

  [NAME.USER_CONF_COLLECTFROM_INVALIED]: (args) => `Please modify the configuration file \`${red(args.userConfigFilePath)}\`(created it if not
existed), assigning field \`${red('collectfrom')}\` the path where books collected from.`,

  [NAME.COLLECTFROM_NOT_EXIST]: (args) => `The books collect from directory \`${red(args.collectfromDir)}\` dose not exist. Please config it in \`${red(args.userConfigFilePath)}\`.`,

  [NAME.MOVE_BOOK]: args => ` ${green('✔')} ${args.fileName}`,

  [NAME.HELP]: (args) => `Usage: bk {-h | --help | -v | --version}
       bk [fuzzy | f | lunr | l | simple | s] searchTerm

Options:
   --help, -h      Show this infomation
   --version, -v   Show version

These are common sub commands used to search books with various search engines:

   fuzzy,  f       Search with fuzzy style
   lunr,   l       Search with lunr.js, a search engine which is like Solr
   simple, s       Search with exact match case insensitively
   collect,c       Collect books from collectfrom directories to booksdir
   <searchTerm>    Same search with both simple and lunr sub commands

Please modify the configuration file \`${args.userConfigFilePath}\` (created it if not
existed), assigning the field \`booksdir\` the path where your books located.
`,
  [NAME.VERSION]: (args) => `v${args.version}`
}

module.exports = {
  show: (NAME, args) => {
    console.log(MSG[NAME](args))
  },
  NAME: NAME
}