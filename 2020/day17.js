let hyper = new Array(20)
   .fill(0)
   .map(_ =>
      new Array(20)
         .fill(0)
         .map(_ => new Array(30).fill(0).map(_ => new Array(30).fill('.')))
   )

const countNeighbors = (x, y, z, w) => {
   let count = 0
   for (let l of [-1, 0, 1]) {
      if (w + l <= 0 || w + l >= hyper.length) continue
      for (let k of [-1, 0, 1]) {
         if (z + k <= 0 || z + k >= hyper[w + l].length) continue
         for (let j of [-1, 0, 1]) {
            if (y + j <= 0 || y + j >= hyper[w + l][z + k].length) continue
            for (let i of [-1, 0, 1]) {
               if (x + i <= 0 || x + i >= hyper[w + l][z + k][y + j].length)
                  continue
               if (i != 0 || j != 0 || k != 0 || l != 0)
                  count += hyper[w + l][z + k][y + j][x + i] == '#'
            }
         }
      }
   }
   return count
}

process.argv[2]
   .trim()
   .split('\n')
   .map(line => line.split(''))
   .forEach((row, y) =>
      row.forEach((c, x) => (hyper[10][10][y + 10][x + 10] = c))
   )

for (let i = 0; i < 6; i++) {
   const neighbors = hyper.map((space, w) =>
      space.map((plane, z) =>
         plane.map((row, y) => row.map((_, x) => countNeighbors(x, y, z, w)))
      )
   )
   hyper = hyper.map((space, w) =>
      space.map((plane, z) =>
         plane.map((row, y) =>
            row.map((c, x) => {
               const n = neighbors[w][z][y][x]
               if (n == 2) return c
               if (n == 3) return '#'
               return '.'
            })
         )
      )
   )
}

/*space.forEach((plane, i) => {
   console.log('z =', i)
   console.log(plane.map(row => row.join('')).join('\n'))
   console.log()
})*/

console.log(
   hyper.reduce(
      (a, space) =>
         a +
         space.reduce(
            (a, plane) =>
               a +
               plane.reduce(
                  (a, row) => a + row.reduce((a, c) => a + (c == '#'), 0),
                  0
               ),
            0
         ),
      0
   )
)
