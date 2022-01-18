import { getInput } from './base.mjs'
let input = (await getInput(22)).trim().split('\n')

const overlap = (a, b) => {
   for (let i = 0; i < 3; i++)
      if (a[i][1] < b[i][0] || a[i][0] > b[i][1]) return false
   return [0, 0, 0].map((_, i) => {
      return [Math.max(a[i][0], b[i][0]), Math.min(a[i][1], b[i][1])]
   })
}

const volume = c => c.reduce((acc, r) => acc * (1 + r[1] - r[0]), 1)

const cubes = []
const anticubes = []
input
   .map(line => line.split(' '))
   .map(([cmd, region]) => [
      cmd,
      region.split(',').map(range => range.slice(2).split('..').map(Number)),
   ])
   //.filter(([cmd, cube]) => cube.every(r => r[0] >= -50 && r[1] <= 50))
   .forEach(([cmd, cube]) => {
      const newAnticubes = []
      cubes.forEach(c => {
         const o = overlap(cube, c)
         if (o) {
            newAnticubes.push(o)
         }
      })
      anticubes.forEach(a => {
         const o = overlap(cube, a)
         if (o) {
            cubes.push(o)
         }
      })
      if (cmd == 'on') cubes.push(cube)
      anticubes.push(...newAnticubes)
   })

console.log(cubes, anticubes)
console.log(
   cubes.reduce((acc, c) => acc + volume(c), 0) -
      anticubes.reduce((acc, c) => acc + volume(c), 0)
)
