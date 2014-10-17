# node-msb128

Read and write variable length integers where bytes are a MSB base 128 encoding of the number.

## Installation

`npm install node-msb128

## Example

```javascript
var msb = require('msb128')

var buf = new Buffer('8358', 'hex')
var n = 600

msb.read(buf)
// { res: 600, off: 2 }

msb.write(n)
// Buffer < 83 58 >
```

## API

### read (buf)

### write (n)
