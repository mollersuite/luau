export default (data) =>
  '\u003Cscript type="application/ld+json"\u003E' +
  JSON.stringify(data) +
  '\u003C/script\u003E'
