const Nobject = require('nobject')
const converters = new Nobject

converters.set(['array', 'buffer'], (array) => {
  return Buffer.from(array)
})

converters.set(['buffer', 'hex'], (buffer) => {
  return buffer.toString('hex')
})

converters.set(['hex', 'buffer'], (hex) => {
  return Buffer.from(hex, 'hex')
})

converters.set(['buffer', 'ascii'], (buffer) => {
  return buffer.toString('ascii')
})

converters.set(['ascii', 'buffer'], (ascii) => {
  return Buffer.from(ascii, 'ascii')
})

converters.set(['buffer', 'utf8'], (buffer) => {
  return buffer.toString('utf8')
})

converters.set(['utf8', 'buffer'], (utf8) => {
  return Buffer.from(utf8, 'utf8')
})

module.exports = converters