import { getInput } from './base.mjs'

const neighbors = {}
let input = (await getInput(12))
   .trim()
   .split('\n')
   .forEach(line => {
      let [a, b] = line.split('-')
      if (!neighbors[a]) neighbors[a] = []
      if (!neighbors[b]) neighbors[b] = []
      neighbors[a].push(b)
      neighbors[b].push(a)
   })

let count = 0
function dfs(visited, node, twice) {
   if (node == 'end') return count++
   for (let n of neighbors[node]) {
      if (n.toLowerCase() != n) {
         dfs(visited, n, twice)
      } else if (visited.includes(n)) {
         if (!twice && n != 'start') dfs(visited, n, true)
      } else dfs([...visited, n], n, twice)
   }
}

dfs(['start'], 'start', false)
console.log(count)
