const fs = require('fs')

const neighborhood = [
   { x: 1, y: 0 },
   { x: -1, y: 0 },
   { x: 0, y: 1 },
   { x: 0, y: -1 },
]

function bfs(grid, start) {
   let dist = 0
   let toExplore = [start]
   while (toExplore.length > 0) {
      let p = toExplore.shift()
      for (let neighbor of neighborhood) {
         let n = { x: p.x + neighbor.x, y: p.y + neighbor.y }
         if (grid[n.y][n.x].match(/[.a-z]/)) toExplore.push(n)
      }
   }
}

function simplifyGraph(grid) {
   let graph = {}
   grid.forEach((line, y) =>
      line.forEach((c, x) => {
         if (c.match(/[a-z]/)) {
            graph[c] = bfs(grid, { x, y })
         }
      })
   )
   return graph
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let grid = data
      .trim()
      .split('\n')
      .map(line => line.split(''))
   let start
   grid.forEach((line, y) =>
      line.forEach((c, x) => {
         if (c == '@') start = { x, y }
      })
   )
   grid[start.y][start.x] = '.'
   console.log('searching from', start)

   let graph = simplifyGraph(grid)

   console.log(graph)
})
