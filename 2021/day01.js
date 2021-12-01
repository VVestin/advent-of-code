let input = require('./base')(1)
   .split('\n').map(Number)
let count = 0
let windowSum = 0
for (let i = 0; i < input.length; i++) {
   let newSum = windowSum + input[i]
   if (i >= 3) {
      newSum -= input[i - 3]
      if (newSum > windowSum)
         count++
      //console.log(i, input[i], windowSum, newSum, newSum > windowSum)
   }
   windowSum = newSum
}
console.log(count)
