import { getInput } from './base.mjs'

let map = (await getInput(25))
   .trim()
   .split('\n')
   .map(line => line.split(''))
const h = map.length
const w = map[0].length
console.log(h, w)

let moved = true
for (let i = 0; moved && i < 1000; i++) {
   moved = false
   let newMap = map.map(row => row.map(x => x))
   for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
         const c = map[i][j]
         if (c != '>') continue
         const nj = (j + 1) % w
         if (map[i][nj] == '.') {
            newMap[i][nj] = c
            newMap[i][j] = '.'
            moved = true
         }
      }
   }
   map = newMap
   newMap = map.map(row => row.map(x => x))
   for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
         const c = map[i][j]
         if (c != 'v') continue
         const ni = (i + 1) % h
         if (map[ni][j] == '.') {
            newMap[ni][j] = c
            newMap[i][j] = '.'
            moved = true
         }
      }
   }
   map = newMap
   console.log(
      i
      //map.map(r => r.join(''))
   )
}
