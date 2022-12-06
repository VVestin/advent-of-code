import { getInput } from '../2021/base.mjs'

let [start, moves] = (await getInput(5, 2022))
   .split('\n\n')
   .map(part => part.split('\n'))

// sad hack because I trim the input when loading from a file
start[0] = '        ' + start[0]
start = start.slice(0, -1)
const stacks = new Array(9).fill(0).map(_ => [])
for (let i = start.length - 1; i >= 0; i--) {
   for (let j = 0; j < 9; j++) {
      if (start[i][4 * j + 1] != ' ') stacks[j].push(start[i][4 * j + 1])
   }
}

moves.forEach(move => {
   console.log(move)
   const [_, amt, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(move)
   stacks[to - 1].push(...stacks[from - 1].splice(-amt, amt))
})

console.log(stacks.map(s => s.at(-1)).join(''))
