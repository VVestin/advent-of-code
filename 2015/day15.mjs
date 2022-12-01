import { getInput } from '../2021/base.mjs'

const input = (await getInput(15, 2015)).split('\n')
const ingStats = {}

function score(amts) {
   const sums = [0, 0, 0, 0, 0]
   for (let ing in amts)
      for (let i = 0; i < sums.length; i++)
         sums[i] += amts[ing] * ingStats[ing][i]
   if (sums[4] != 500) return 0
   return sums.slice(0, 4).reduce((acc, v) => acc * Math.max(0, v), 1)
}

input.forEach(line => {
   const [ing, rest] = line.split(': ')
   const stats = rest.split(', ').map(pair => Number(pair.split(' ')[1]))
   ingStats[ing.toLowerCase()] = stats
})

console.log(ingStats)
let max = 0
for (let sugar = 0; sugar <= 100; sugar++) {
   for (let sprinkles = 0; sprinkles <= 100 - sugar; sprinkles++) {
      for (let candy = 0; candy <= 100 - sugar - sprinkles; candy++) {
         const chocolate = 100 - sugar - sprinkles - candy
         const s = score({ sugar, sprinkles, candy, chocolate })
         if (s > max) max = s
      }
   }
}
console.log(max)
