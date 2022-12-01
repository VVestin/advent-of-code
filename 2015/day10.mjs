import { getInput } from '../2021/base.mjs'

let input = await getInput(10, 2015)

function lookSay(n) {
   n += '.'
   let count = 0
   let prev = n[0]
   let res = ''
   for (let d of n.slice(1)) {
      count++
      if (d == prev) continue
      res += count + prev
      count = 0
      prev = d
   }
   return res
}

for (let i = 0; i < 50; i++) input = lookSay(input)
console.log(input.length)
