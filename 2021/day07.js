let input = require('./base')(7).split(',').map(Number)

console.log(input)
min = Number.MAX_SAFE_INTEGER
console.log(min)
const triangle = x => (x * (x + 1)) / 2
for (let i = 0; i < Math.max(...input); i++) {
   let avg = input.reduce((acc, x) => acc + triangle(Math.abs(x - i)), 0)

   if (avg < min) min = avg
   console.log(i, avg)
}
console.log(min)
