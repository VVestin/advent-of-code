let input = require('./base')(9)
   .split('\n')
   .map(line => line.split('').map(Number))

function get([x, y]) {
   if (x < 0 || y < 0 || y >= input.length || x >= input[0].length) return 100
   return input[y][x]
}

console.log(input)
let basins = []
for (let y = 0; y < input.length; y++) {
   for (let x = 0; x < input[y].length; x++) {
      const v = get([x, y])
      const neighbors = [
         [x - 1, y],
         [x + 1, y],
         [x, y - 1],
         [x, y + 1],
      ]
      if (neighbors.every(loc => get(loc) > v)) {
         basins.push([[x, y]])
      }
   }
}
for (basin of basins) {
   const toVisit = [basin.pop()]
   while (toVisit.length) {
      const pos = toVisit.shift()
      basin.push(pos)
      const [x, y] = pos
      const neighbors = [
         [x - 1, y],
         [x + 1, y],
         [x, y - 1],
         [x, y + 1],
      ].filter(pos => get(pos) < 9)
      console.log(pos, neighbors)
      for (neighbor of neighbors) {
         if (
            basin.every(p => String(p) != String(neighbor)) &&
            toVisit.every(p => String(p) != String(neighbor))
         )
            toVisit.push(neighbor)
      }
   }
   console.log('basin', basin)
}
console.log(basins)
const basinLens = basins.map(b => b.length).sort((x, y) => x - y)
console.log(basinLens.slice(-3).reduce((a, x) => a * x))
