let octos = require('./base')(11).split('\n').join('').split('').map(Number)

function valid(x, i) {
   return x >= 0 && x < 100 && Math.abs((x % 10) - (i % 10)) <= 1
}

let flashes = 0
for (let round = 0; round < 10_000; round++) {
   let toFlash = octos.map((v, i) => i)
   let flashed = []
   while (toFlash.length) {
      const i = toFlash.pop()
      const v = ++octos[i]
      if (v >= 10 && !flashed.includes(i)) {
         flashes++
         flashed.push(i)
         ;[-11, -10, -9, -1, 1, 9, 10, 11]
            .map(j => i + j)
            .filter(x => valid(x, i))
            .filter(x => !flashed.includes(x))
            .forEach(pos => toFlash.unshift(pos))
      }
   }
   flashed.forEach(i => (octos[i] = 0))

   if (flashed.length == 100) {
      console.log(round + 1)
      break
   }
}
console.log(flashes)
