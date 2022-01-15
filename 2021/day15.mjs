import { getInput } from './base.mjs'
let input = (await getInput(15))
   .split('\n')
   .map(line => line.split('').map(Number))
const rw = input[0].length
const w = 5 * rw
const rh = input.length
const h = 5 * rh
input = input.reduce((acc, l) => acc.concat(l), [])
const dist = {}
for (let i = 0; i < w * h; i++) dist[i] = 1_000_000
const prev = {}
let to_visit = [0]
dist[0] = 0
function neighbors(v) {
   const ns = []
   if (v % w > 0) ns.push(v - 1)
   if (v % w < w - 1) ns.push(v + 1)
   if (v >= w) ns.push(v - w)
   if (v < h * (w - 1)) ns.push(v + w)
   return ns
}
while (to_visit.length) {
   let u = to_visit.reduce((m, v) => {
      if (dist[v] < dist[m]) return v
      return m
   })
   to_visit = to_visit.filter(x => x != u)
   for (let v of neighbors(u)) {
      const x = Math.floor((v % w) / rw)
      const y = Math.floor(Math.floor(v / w) / rh)
      const rx = (v % w) % rw
      const ry = Math.floor(v / w) % rh
      let cost = input[ry * rw + rx] + x + y
      while (cost >= 10) cost -= 9
      const alt = dist[u] + cost
      if (alt < dist[v]) {
         dist[v] = alt
         prev[v] = u
         if (!to_visit.includes(v)) to_visit.push(v)
      }
   }
}

console.log(w * h - 1, dist[w * h - 1])
