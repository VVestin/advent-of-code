const BIG_DIVISOR = 20201227

const publicKeys = process.argv[2].trim().split('\n').map(Number)
const loopSizes = publicKeys.map(key => {
   let val = 1
   for (let i = 0; ; i++) {
      if (val == key) return i
      val = (val * 7) % BIG_DIVISOR
   }
})

let encryptionKey = 1
for (let i = 0; i < loopSizes[0]; i++)
   encryptionKey = (encryptionKey * publicKeys[1]) % BIG_DIVISOR

console.log(publicKeys, loopSizes, encryptionKey)
