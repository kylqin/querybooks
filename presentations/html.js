// booklistHTML += `<li><a href="file://${fileName}">${path.basename(fileName)}</a></li>\n`;

function presentationHTML () {
  let booklistHTML = ''
  const html = `
<html>
  <head>
    <title>Books Query</title>
  </head>
  <body>
    <ol>
      ${booklistHTML}
    </ol>
  </body>
</html>
`
  return html
}
