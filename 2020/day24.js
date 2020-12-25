let blackTiles = new Set()

process.argv[2]
   .trim()
   .split('\n')
   .map(
      line =>
         line
            .split('')
            .reduce(
               ([acc, list], c) =>
                  c == 'n' || c == 's' ? [c, list] : ['', list.concat(acc + c)],
               ['', []]
            )[1]
   )
   .map(dirs =>
      String(
         dirs.reduce(
            ([x, y], dir) => {
               if (dir.startsWith('n')) y--
               else if (dir.startsWith('s')) y++
               if (dir == 'e' || (dir.endsWith('e') && y % 2 == 0)) x++
               else if (dir == 'w' || (dir.endsWith('w') && y % 2 != 0)) x--
               return [x, y]
            },
            [0, 0]
         )
      )
   )
   .forEach(pos => {
      if (blackTiles.has(pos)) blackTiles.delete(pos)
      else blackTiles.add(pos)
   })

const neighborhood = pos => {
   const [x, y] = pos.split(',').map(Number)
   return [
      [x + 1, y],
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
      [x + (y % 2 != 0 ? 1 : -1), y + 1],
      [x + (y % 2 != 0 ? 1 : -1), y - 1],
   ].map(String)
}

for (let i = 0; i < 100; i++) {
   const newBlackTiles = new Set()
   const relevantTiles = new Set()
   blackTiles.forEach((black, pos) => {
      relevantTiles.add(pos)
      if (black) neighborhood(pos).forEach(p => relevantTiles.add(p))
   })
   relevantTiles.forEach(pos => {
      const black = blackTiles.has(pos)
      const n = neighborhood(pos).reduce(
         (acc, neighbor) => acc + +blackTiles.has(neighbor),
         0
      )
      //console.log(black, pos, n)
      if ((!black && n == 2) || (black && (n == 1 || n == 2)))
         newBlackTiles.add(pos)
   })
   blackTiles = newBlackTiles
   console.log(blackTiles.size)
}
