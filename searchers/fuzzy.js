const fuzzy = require('fuzzy');

/**
  * 返回搜索结果
  * @parameter searchTerm 搜索字
  * @parameter list Array 要搜索的列表
  * @return Array [{ string, name, url }]
  */
exports.search = function (searchTerm, list) {
  const options = {
    // see: https://misc.flogisoft.com/bash/tip_colors_and_formatting
    pre: '\x1b[31m',
    post: '\x1b[0m',
    extract: el => el.name,
  };

  return fuzzy.filter(searchTerm, list, options);
};
