const NAME = {
    HELP: 'HELP',
    VERSION: 'VERSION',
    USER_CONF_INVALID: 'USER_CONF_INVALID',
    BOOKSDIR_NOT_EXIST: 'BOOKSDIR_NOT_EXIST',
}

const MSG = {
    [NAME.USER_CONF_INVALID]: (args) => `Please modify the configuration file \`\x1b[31m${args.userConfigFilePath}\x1b[0m\`(created it if not
existed), assigning field \`\x1b[31mbooksdir\x1b[0m\` the path where your books located.`,

    [NAME.BOOKSDIR_NOT_EXIST]: (args) => `The bookdir directory \`\x1b[31m${args.booksdir}\x1b[0m\` dose not exist. Please config it in \`\x1b[31m${args.userConfigFilePath}.\x1b[0m\``,

    [NAME.HELP]: (args) => `Usage: bk {-h | --help | -v | --version}
       bk [fuzzy | f | lunr | l | simple | s] searchTerm

Options:
   --help, -h      Show this infomation
   --version, -v   Show version

These are common sub commands used to search books with various search engines:

   fuzzy,  f       Search with fuzzy style
   lunr,   l       Search with lunr.js, a search engine which is like Solr
   simple, s       Search with exact match case insensitively
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