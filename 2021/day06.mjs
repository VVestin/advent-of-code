import { getInput } from './base.mjs'
const fish = (await getInput(6)).split(',')

const fishByDay = new Array(9).fill(0)
for (let d of fish) fishByDay[d]++

for (let i = 0; i < 256; i++) {
   const newFish = fishByDay[0]
   for (let day = 0; day < 8; day++) fishByDay[day] = fishByDay[day + 1]
   fishByDay[6] += newFish
   fishByDay[8] = newFish
}
console.log(fishByDay.reduce((a, b) => a + b, 0))
