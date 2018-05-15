const lunr = require('lunr');

/**
 * 返回搜索结果
 * @parameter searchTerm 搜索字
 * @parameter list Array 要搜索的列表
 * @return Array [{ string, name, url }]
 */
exports.search = function (searchTerm, list) {
  const documents = list.map((el, idx) => {
    el.id = '' + idx;
    return el;
  });

  const idx = lunr(function () {
    this.ref('id');
    this.field('name');
    this.metadataWhitelist = ['position'];

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  const result = idx.search(searchTerm);

  return result.map(el => {
    return {
      string: makeString(el, documents[el.ref]),
      name: documents[el.ref].name,
      url: documents[el.ref].path
    };
  });
};

const options = {
  // see: https://misc.flogisoft.com/bash/tip_colors_and_formatting
  pre: '\x1b[31m',
  post: '\x1b[0m',
};


function makeString (item, original) {
  const name = original.name;
  const md = item.matchData.metadata;
  const positions = Object.keys(md).map(stem => {
    const ps = md[stem].name.position[0];
    return { start: ps[0], end: ps[0] + ps[1] };
  }).sort((a, b) => a.start - b.start);
  // console.log(name, '\npositions -> ', positions);

  nameComponents = positions.reduce((acc, ps) => {
    acc.comps.push(name.slice(acc.lastEnd, ps.start));
    acc.comps.push(options.pre + name.slice(ps.start, ps.end) + options.post);
    acc.lastEnd = ps.end;
    return acc;
  }, { lastEnd: 0, comps: [] });
  // console.log('nameComponents -> ', nameComponents);
  nameComponents.comps.push(name.slice(nameComponents.lastEnd));

  const string = nameComponents.comps.join('');
  // console.log('string -> ', string);
  return string;
}
