import { getInput } from './base.mjs'
let [coords, instructions] = await getInput(13)
   .split('\n\n')
   .map(x => x.split('\n'))

coords = coords.map(coord => coord.split(',').map(Number))

function indexOf(coord) {
   for (let i = 0; i < coords.length; i++)
      if (coords[i][0] == coord[0] && coords[i][1] == coord[1]) return i
   return -1
}
console.log(coords.length)
instructions
   .map(i => i.split(' ')[2].split('='))
   .forEach(([axis, val]) => {
      if (axis == 'x') {
         coords = coords.map(([x, y]) => {
            if (x < val) return [x, y]
            else return [val - (x - val), y]
         })
      } else if (axis == 'y') {
         coords = coords.map(([x, y]) => {
            if (y < val) return [x, y]
            else return [x, val - (y - val)]
         })
      }
      coords = coords.filter((c, i) => indexOf(c) == i)
      console.log(axis, val, coords, coords.length)
   })

const map = new Array(10).fill(0).map(_ => new Array(50).fill('.'))

for (let [x, y] of coords) map[y][x] = '#'
console.log(map.map(row => row.join('')).join('\n'))
