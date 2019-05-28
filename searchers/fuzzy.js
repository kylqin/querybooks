const fuzzy = require('fuzzy')
const Utils = require('../utils')

/**
  * 返回搜索结果
  * @parameter searchTerm 搜索字
  * @parameter list Array 要搜索的列表
  * @return Array [{ string, name, url }]
  */
exports.search = function (searchTerm, list) {
  const options = {
    pre: Utils.color.NAME.Red,
    post: Utils.color.NAME.End,
    extract: el => el.name
  }

  return fuzzy.filter(searchTerm, list, options).map(item => ({ ...item, url: item.original.path }))
}
