function read (buf) {
  var n, i = 0

  while (true) {
    n = (n << 7) | (buf[i] & 0x7f)
    if (buf[i++] & 0x80)
      n++
    else
      return { res: n, off: i }
  }
}

function write (n) {
  var tmp = []
  var len = 0
  var buf = new Buffer([])

  while (true) {
    tmp[len] = (n & 0x7F) | (len ? 0x80 : 0x00)
    if (n <= 0x7F)
        break
    n = (n >> 7) - 1
    len++
  }

  do {
    buf = Buffer.concat([ buf, new Buffer([tmp[len]]) ])
  } while(len--)

  return buf
}

module.exports.read = read
module.exports.write = write
