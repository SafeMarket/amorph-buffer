const chai = require('chai')
const converters = require('../')
const Nobject = require('nobject')
const expect = chai.expect

chai.should()

describe('converters', () => {

  const buffer = new Buffer([1, 2, 3])

  it('should be instance of Nobject', () => {
    converters.should.be.instanceOf(Nobject)
  })

  describe('array-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['array', 'buffer'])([1, 2, 3])
      buffer.toJSON().data.should.deep.equal([1, 2, 3])
    })
  })

  describe('buffer-hex', () => {
    it('test 1', () => {
      const buffer = Buffer.from('010203', 'hex')
      const hex = converters.get(['buffer', 'hex'])(buffer)
      hex.should.equal('010203')
    })
  })

  describe('hex-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['hex', 'buffer'])('010203')
      buffer.toJSON().data.should.deep.equal([1, 2, 3])
    })
  })

  describe('buffer-ascii', () => {
    it('test 1', () => {
      const buffer = Buffer.from([0x74, 0x65, 0x73, 0x74])
      const ascii = converters.get(['buffer', 'ascii'])(buffer)
      ascii.should.equal('test')
    })
  })

  describe('ascii-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['ascii', 'buffer'])('test')
      buffer.toJSON().data.should.deep.equal([0x74, 0x65, 0x73, 0x74])
    })
  })

  describe('buffer-utf8', () => {
    it('test 1', () => {
      const buffer = Buffer.from([0x74, 0xc3, 0xa9, 0x73, 0x74])
      const ascii = converters.get(['buffer', 'utf8'])(buffer)
      ascii.should.equal('tést')
    })
  })

  describe('utf8-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['utf8', 'buffer'])('tést')
      buffer.toJSON().data.should.deep.equal([0x74, 0xc3, 0xa9, 0x73, 0x74])
    })
  })

  describe('buffer-utf16le', () => {
    it('test 1', () => {
      const buffer = Buffer.from([0x3d, 0xd8, 0x11, 0xdc, 0x3d, 0xd8, 0x0d, 0xdc])
      const ascii = converters.get(['buffer', 'utf16le'])(buffer)
      ascii.should.equal('🐑🐍')
    })
  })

  describe('utf16le-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['utf16le', 'buffer'])('🐑🐍')
      buffer.toJSON().data.should.deep.equal([0x3d, 0xd8, 0x11, 0xdc, 0x3d, 0xd8, 0x0d, 0xdc])
    })
  })

  describe('utf16le-ucs2', () => {
    it('test 1', () => {
      const ucs2 = converters.get(['utf16le', 'ucs2'])('🐑🐍')
      ucs2.should.equal('🐑🐍')
    })
  })

  describe('ucs2-utf16le', () => {
    it('test 1', () => {
      const utf16le = converters.get(['ucs2', 'utf16le'])('🐑🐍')
      utf16le.should.equal('🐑🐍')
    })
  })

  // describe('uint8array-hex', () => {
  //   it('test 1', () => {
  //     const hex = hexConverters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 255]))
  //     expect(hex).to.be.a.string
  //     expect(hex).to.equal('000102ff')
  //   })

  //   it('test 2', () => {
  //     const hex = hexConverters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 15]))
  //     expect(hex).to.be.a.string
  //     expect(hex).to.equal('0001020f')
  //   })
  // })

  // describe('hex-hex.prefixed', () => {
  //   it('test 1', () => {
  //     const prefixedHex = hexConverters.get(['hex', 'hex.prefixed'])('00ff')
  //     expect(prefixedHex).to.be.a.string
  //     expect(prefixedHex).to.equal('0x00ff')
  //   })

  //   it('test 2', () => {
  //     const hex = hexConverters.get(['hex.prefixed', 'hex'])('0x00ff')
  //     expect(hex).to.be.a.string
  //     expect(hex).to.equal('00ff')
  //   })
  // })


})
