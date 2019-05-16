module.exports = {
  p: function (filtered) {
    const bkLightBlue = '\x1b[104m'
    const colorBlue = '\x1b[90m'
    const colorEnd = '\x1b[0m'

    console.log(filtered.map(
      r => r.string + '\n => "' +
        colorBlue + r.url.slice(7, -4) + colorEnd +
        bkLightBlue + r.url.slice(-4) + colorEnd + '"'
    ).join('\n'))
  }
}
