import { getInput } from '../2021/base.mjs'

const input = await getInput(14, 2015).split('\n')

const reindeer = input.map(line => {
   line = line.split(' ')
   const name = line[0]
   const speed = Number(line[3])
   const duration = Number(line[6])
   const rest = Number(line.at(-2))
   return { name, speed, duration, rest, points: 0 }
})

function distAfter(r, limit) {
   if (limit <= 0) return 0
   const { speed, duration, rest } = r
   if (limit < duration) return speed * limit
   return speed * duration + distAfter(r, limit - duration - rest)
}

let leader = { dist: 0 }
for (let s = 1; s <= 2503; s++) {
   for (let r of reindeer) {
      r.dist = distAfter(r, s)
      if (r.dist > leader.dist) leader = r
   }
   console.log(leader.name)
   leader.points++
}

console.log(reindeer.map(r => r.points))
