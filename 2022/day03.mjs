import { getInput } from '../2021/base.mjs'

const input = (await getInput(3, 2022)).split('\n').map(line => line)

let alphabet = '.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0
for (let i = 0; i < input.length; i += 3) {
   const a = input[i]
   const b = input[i + 1]
   const c = input[i + 2]
   console.log(a, b, c)
   for (let j = 0; j < a.length; j++) {
      let l = a[j]
      if (b.includes(l) && c.includes(l)) {
         console.log(l, alphabet.indexOf(l))
         sum += alphabet.indexOf(l)
         break
      }
   }
}
console.log(sum)
