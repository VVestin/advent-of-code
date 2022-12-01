import { getInput } from '../2021/base.mjs'

const input = (await getInput(9, 2015)).split('\n')

const graph = {}

function totalDist(from, toVisit) {
   if (toVisit.length == 0) return 0
   const dists = Object.keys(graph[from])
      .filter(p => toVisit.includes(p))
      .map(
         point =>
            graph[from][point] +
            totalDist(
               point,
               toVisit.filter(p => p != point)
            )
      )
   //console.log('dist', from, toVisit)
   //console.log(dists)
   return Math.max(...dists)
}

for (let line of input) {
   const [points, distance] = line.split(' = ')
   const [a, b] = points.split(' to ')
   if (!graph[a]) graph[a] = {}
   graph[a][b] = Number(distance)
   if (!graph[b]) graph[b] = {}
   graph[b][a] = Number(distance)
}

const nowhere = {}
for (let k in graph) nowhere[k] = 0
graph.NOWHERE = nowhere
console.log(
   totalDist(
      'NOWHERE',
      Object.keys(graph).filter(p => p != 'NOWHERE')
   )
)
