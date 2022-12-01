import { getInput } from '../2021/base.mjs'

const input = (await getInput(6, 2015)).split('\n')

let grid = new Array(1000).fill(0).map(_ => new Array(1000).fill(0))

input.forEach(line => {
   const splitIdx = line.match(/\d/).index
   const cmd = line.slice(0, splitIdx - 1)
   const [start, end] = line
      .slice(splitIdx)
      .split(' through ')
      .map(coord => coord.split(',').map(Number))
   for (let y = start[1]; y <= end[1]; y++) {
      for (let x = start[0]; x <= end[0]; x++) {
         if (cmd == 'turn on') grid[y][x]++
         else if (cmd == 'turn off' && grid[y][x] > 0) grid[y][x]--
         else if (cmd == 'toggle') grid[y][x] += 2
      }
   }
})

let lit = 0
for (let y = 0; y < 1000; y++) {
   for (let x = 0; x < 1000; x++) {
      lit += grid[y][x]
   }
}

console.log(lit)
