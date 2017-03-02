const Nobject = require('nobject')
const converters = new Nobject
const arrayEquals = require('array-equal')

function normalizeHex(hex) {
  return hex.length % 2 === 0 ? hex : hex.slice(0, -1) + '0' + hex.slice(-1)
}

converters.set(['array', 'buffer'], (array) => {
  return Buffer.from(array)
})

converters.set(['buffer', 'uint8Array'], (buffer) => {
  return new Uint8Array(buffer)
})

converters.set(['uint8Array', 'array'], (uint8Array) => {
  return Array.from(uint8Array)
})

converters.set(['buffer', 'hex'], (buffer) => {
  return normalizeHex(buffer.toString('hex'))
})

converters.set(['hex', 'buffer'], (hex) => {
  return Buffer.from(normalizeHex(hex), 'hex')
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

converters.set(['buffer', 'base64'], (buffer) => {
  return buffer.toString('base64')
})

converters.set(['base64', 'buffer'], (base64) => {
  return Buffer.from(base64, 'base64')
})

converters.set(['buffer', 'utf16le'], (buffer) => {
  return buffer.toString('utf16le')
})

converters.set(['utf16le', 'buffer'], (utf16le) => {
  return Buffer.from(utf16le, 'utf16le')
})

module.exports = {
  pluginVersion: 1,
  converters: converters,
  equivalenceTests: {
    array: arrayEquals,
    buffer: (a, b) => {
      return Buffer.compare(a, b) === 0
    }
  }
}
