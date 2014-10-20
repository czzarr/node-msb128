var bn = require('bn.js')

function read (buf) {
  var n = new bn(0)
  var test = 0, i = 0

  while (true) {
    n = n.shln(7)
    n = n.addn((buf[i] & 0x7f))
    if (buf[i++] & 0x80)
      n = n.addn(1)
    else
      return { res: n, off: i }
  }
}

function write (n) {
  if (!(n instanceof bn)) {
    n = new bn(n)
  }

  var tmp = []
  var len = 0
  var buf = new Buffer([])

  while (true) {
    tmp[len] = new bn(n.andln(0x7f))
    tmp[len] = tmp[len].addn(len ? 0x80 : 0x00)
    if (n.cmpn(0x7f) <= 0)
      break
    n = n.shrn(7)
    n = n.subn(1)
    len++
  }

  do {
    buf = Buffer.concat([ buf, new Buffer(tmp[len].toArray()) ])
  } while(len--)

  return buf
}

module.exports.read = read
module.exports.write = write
