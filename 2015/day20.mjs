import { getInput } from '../2021/base.mjs'

const input = await getInput(20, 2015)

function presents(n) {
   let sum = 0
   const sqrt = Math.sqrt(n)
   for (let i = 1; i < sqrt; i++) {
      if (n % i == 0) {
         if (i <= 50) sum += n / i
         if (n / i <= 50) sum += i
      }
   }
   if (Math.floor(sqrt) == sqrt) sum += sqrt
   return sum * 11
}

let i
for (i = 1; presents(i) < input; i++) console.log(i, presents(i))
console.log('winner', i)
