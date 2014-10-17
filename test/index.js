var bufferEqual = require('buffer-equal')
var test = require('tape')
var msb = require('../')

test('MSB tests', function (t) {
  t.plan(6)

  var enc = [new Buffer('8358', 'hex'), new Buffer('86af3b', 'hex'), new Buffer('8bb85e', 'hex')]
  var dec = [600, 120891, 203998]

  for (var i = 0; i < enc.length; i++) {
    t.equal(msb.read(enc[i]).res, dec[i])
    t.ok(bufferEqual(msb.write(dec[i]), enc[i]))
  }
})
