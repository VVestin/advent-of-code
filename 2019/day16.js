const fs = require('fs')

let pattern = [1, 0, -1, 0]

function gcd(a, b) {
   if (a == 0)
      return b
   return gcd(b % a, a)
}

function lcm(a, b) {
   return a * b / gcd(a, b)
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let raw = data.trim().split('').map(x => parseInt(x))
   data = raw
   console.log('input', raw, data.length)

   for (let step = 0; step < 100; step++) {
      let next = []
      let sum = 0
      do {
         for (let i = data.length - 1; i >= 0; i--) {
            sum = (sum + data[i]) % 10

            next.unshift(sum)
         }
      } while (sum != 0);
      data = next
      //console.log('next', next)
      //console.log(next.join(''))
      console.log(step, next.length)
   }
   //console.log('result', data)
   let offset = 5977341
   let idx = data.length - (raw.length * 10000 - offset) % data.length
   console.log(raw.length, offset, raw.length * 10000 - offset, idx, data.slice(idx, idx + 8))
})
