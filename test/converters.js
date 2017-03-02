const chai = require('chai')
const plugin = require('../')
const converters = plugin.converters
const Nobject = require('nobject')
const expect = chai.expect

chai.should()

describe('converters', () => {

  const buffer = new Buffer([1, 2, 3])
  const array = [4, 5, 6]
  const uint8Array = new Uint8Array([7, 8, 9])

  it('should be instance of Nobject', () => {
    converters.should.be.instanceOf(Nobject)
  })

  describe('array-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['array', 'buffer'])(array)
      buffer.should.be.instanceOf(Buffer)
      buffer.toJSON().data.should.deep.equal([4, 5, 6])
    })
  })

  describe('buffer-uint8Array', () => {
    it('test 1', () => {
      const uint8Array = converters.get(['buffer', 'uint8Array'])(buffer)
      uint8Array.should.be.instanceOf(Uint8Array)
      uint8Array.should.deep.equal({ '0': 1, '1': 2, '2': 3 })
    })
  })

  describe('uint8Array-array', () => {
    it('test 1', () => {
      const array = converters.get(['uint8Array', 'array'])(uint8Array)
      array.should.be.instanceOf(Array)
      array.should.deep.equal([7, 8, 9])
    })
  })

  describe('buffer-hex', () => {
    it('test 1', () => {
      const hex = converters.get(['buffer', 'hex'])(buffer)
      hex.should.equal('010203')
    })
    it('test 2', () => {
      const hex = converters.get(['buffer', 'hex'])(new Buffer([0x11, 0x08]))
      hex.should.equal('1108')
    })
  })

  describe('hex-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['hex', 'buffer'])('010203')
      buffer.toJSON().data.should.deep.equal([1, 2, 3])
    })
    it('test 2', () => {
      const buffer = converters.get(['hex', 'buffer'])('aabBCCDd')
      buffer.toJSON().data.should.deep.equal([170, 187, 204, 221])
    })
    it('test 3', () => {
      const buffer = converters.get(['hex', 'buffer'])('10203')
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

  describe('buffer-base64', () => {
    it('test 1', () => {
      const buffer = Buffer.from([0x74, 0x65, 0x73, 0x74])
      const base64 = converters.get(['buffer', 'base64'])(buffer)
      base64.should.equal('dGVzdA==')
    })
  })

  describe('base64-buffer', () => {
    it('test 1', () => {
      const buffer = converters.get(['base64', 'buffer'])('dGVzdA==', 'base64')
      buffer.toJSON().data.should.deep.equal([0x74, 0x65, 0x73, 0x74])
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

})

describe('equivalenceTests', () => {
  describe('array', () => {
    const test = plugin.equivalenceTests.array
    it('[] should equal []', () => {
      test([], []).should.equal(true)
    })

    it('[1] should NOT equal []', () => {
      test([1], []).should.equal(false)
    })

    it('[] should NOT equal [1]', () => {
      test([], [1]).should.equal(false)
    })

    it('[1] should equal [1]', () => {
      test([1], [1]).should.equal(true)
    })
  })

  describe('buffer', () => {
    const test = plugin.equivalenceTests.buffer
    it('new Buffer([]) should equal new Buffer([])', () => {
      test(new Buffer([]), new Buffer([])).should.equal(true)
    })

    it('new Buffer([1]) should NOT equal new Buffer([])', () => {
      test(new Buffer([1]), new Buffer([])).should.equal(false)
    })

    it('new Buffer([]) should NOT equal new Buffer([1])', () => {
      test(new Buffer([]), new Buffer([1])).should.equal(false)
    })

    it('new Buffer([1]) should equal new Buffer([1])', () => {
      test(new Buffer([1]), new Buffer([1])).should.equal(true)
    })

    it('new Buffer(0x010203) should equal new Buffer([1, 2, 3])', () => {
      test(Buffer.from('010203', 'hex'), new Buffer([1, 2, 3])).should.equal(true)
    })
  })
})
