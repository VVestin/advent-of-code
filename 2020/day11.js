function neighbors(map, r, c) {
   let occupied = 0
   for (let i of [-1, 0, 1]) {
      for (let j of [-1, 0, 1]) {
         if (i == 0 && j == 0) continue
         for (let k = 1; ; k++) {
            let y = r + k * i
            let x = c + k * j
            if (y < 0 || y >= map.length) break
            if (x < 0 || x >= map[y].length) break
            if (map[y][x] == 'L') break
            if (map[y][x] == '#') {
               occupied++
               break
            }
         }
      }
   }
   return occupied
}

let map = process.argv[2]
   .trim()
   .split('\n')
   .map(line => line.split(''))

let changed = true
let count = 0
while (changed) {
   changed = false
   map = map.map((row, r) =>
      row.map((x, c) => {
         const occupied = neighbors(map, r, c)
         if (x == 'L' && occupied == 0) {
            changed = true
            return '#'
         }
         if (x == '#' && occupied >= 5) {
            changed = true
            return 'L'
         }
         return x
      })
   )
   count++
}

console.log(
   map.reduce(
      (acc, row) => acc + row.reduce((a, x) => a + (x == '#' ? 1 : 0), 0),
      0
   )
)
