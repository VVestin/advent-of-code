import { getInput } from '../2021/base.mjs'

const input = (await getInput(17, 2015))
   .trim()
   .split('\n')
   .map(Number)
   .sort((a, b) => b - a)

function ways(eggnog, containers, maxContainers) {
   if (maxContainers == 0) return 0
   if (eggnog == 0) return 1
   let total = 0
   for (let i = 0; i < containers.length; i++) {
      if (containers[i] > eggnog) continue
      total += ways(
         eggnog - containers[i],
         containers.slice(i + 1),
         maxContainers - 1
      )
   }
   return total
}

let w = 0
let depth = 1
while (w == 0) w = ways(150, input, depth++)
console.log(w)
