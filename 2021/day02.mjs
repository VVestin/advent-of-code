import { getInput } from './base.mjs'
const input = (await getInput(2)).split('\n')

let hor = 0
let depth = 0
let aim = 0
input.forEach(i => {
   let [dir, amt] = i.split(' ')
   amt = Number(amt)
   if (dir == 'forward') {
      hor += amt
      depth += aim * amt
   }
   if (dir == 'up') aim -= amt
   if (dir == 'down') aim += amt
})

console.log(hor * depth)
