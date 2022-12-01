import { getInput } from '../2021/base.mjs'

const input = (await getInput(18, 2015)).split('\n')

let g = input.map(line => line.split(''))

function getNeighbors(grid, x, y) {
   let count = 0
   for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
         if (i == 0 && j == 0) continue
         if (grid[x + i] && grid[x + i][y + j] && grid[x + i][y + j] == '#')
            count++
      }
   }
   return count
}

function step(grid) {
   const newGrid = new Array(grid.length)
      .fill(0)
      .map(_ => new Array(grid[0].length).fill('.'))
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         const neighbors = getNeighbors(grid, i, j)
         if (grid[i][j] == '#' && (neighbors < 2 || neighbors > 3))
            newGrid[i][j] = '.'
         else if (grid[i][j] == '.' && neighbors == 3) newGrid[i][j] = '#'
         else newGrid[i][j] = grid[i][j]
      }
   }
   return newGrid
}

function turnOnCorners(grid) {
   grid[0][0] = '#'
   grid[grid.length - 1][0] = '#'
   grid[0][grid[0].length - 1] = '#'
   grid[grid.length - 1][grid[0].length - 1] = '#'
}

turnOnCorners(g)
for (let i = 0; i < 100; i++) {
   g = step(g)
   turnOnCorners(g)
   console.log(
      i,
      g.reduce((acc, row) => acc + row.reduce((a, b) => a + +(b == '#'), 0), 0)
   )
   //console.log(g.map(line => line.join('')).join('\n'))
}
