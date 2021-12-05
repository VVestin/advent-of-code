const input = require('./base')(5)
   .split('\n')

const size = 1000
const map = new Array(size).fill(0).map(x => new Array(size).fill(0))

function getDir(diff) {
   if (diff < 0) return 1
   if (diff > 0) return -1
   return 0
}

input.map(line => line.split(' -> ').map(pair => pair.split(',').map(Number)))
   .forEach(([start, end]) => {
      const xDiff = start[0] - end[0]
      const yDiff = start[1] - end[1]
      const xDir = getDir(xDiff)
      const yDir = getDir(yDiff)
      for (let i = 0; i <= Math.max(Math.abs(xDiff), Math.abs(yDiff)); i++)
         map[start[0] + i * xDir][start[1] + i * yDir]++
   })

//console.log(map.map(line => line.join('')).join('\n'))

console.log(map.reduce((acc, row) => acc + row.reduce((acc, x) => acc + Number(x > 1), 0), 0))
