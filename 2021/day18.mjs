import { getInput } from './base.mjs'
let lines = (await getInput(18)).split('\n')

const isPair = sf =>
   Array.isArray(sf) && typeof sf[0] == 'number' && typeof sf[1] == 'number'

const get = (snailFish, path) => {
   //console.log('get', JSON.stringify(snailFish), path)
   if (path.length == 0) return snailFish
   return get(snailFish[path[0]], path.slice(1))
}

const set = (snailFish, path, val) => {
   //console.log('set', JSON.stringify(snailFish), path, val)
   if (path.length == 1) snailFish[path[0]] = val
   else set(snailFish[path[0]], path.slice(1), val)
}

const split = sf => {
   if (!sf) return false
   for (let i of [0, 1]) {
      if (typeof sf[i] == 'number' && sf[i] >= 10) {
         sf[i] = [Math.floor(sf[i] / 2), Math.ceil(sf[i] / 2)]
         return true
      } else if (split(sf[i])) return true
   }
   return false
}

const explode = snailFish => {
   const pathIndex = []
   let toExplode = null
   const index = (sf, path) => {
      if (!Array.isArray(sf)) {
         pathIndex.push(path)
         return
      }
      if (toExplode === null && isPair(sf) && path.length >= 4) {
         toExplode = pathIndex.length
         pathIndex.push(path)
      } else {
         index(sf[0], [...path, 0])
         index(sf[1], [...path, 1])
      }
   }
   index(snailFish, [])
   //console.log(pathIndex, toExplode)
   if (toExplode === null) return false
   const exploded = get(snailFish, pathIndex[toExplode])
   if (toExplode > 0)
      set(
         snailFish,
         pathIndex[toExplode - 1],
         get(snailFish, pathIndex[toExplode - 1]) + exploded[0]
      )
   if (toExplode < pathIndex.length - 1)
      set(
         snailFish,
         pathIndex[toExplode + 1],
         get(snailFish, pathIndex[toExplode + 1]) + exploded[1]
      )
   set(snailFish, pathIndex[toExplode], 0)
   //console.log('explode', JSON.stringify(snailFish))
   return explode(snailFish) || true
}

const magnitude = sf => {
   if (typeof sf == 'number') return sf
   return 3 * magnitude(sf[0]) + 2 * magnitude(sf[1])
}

let best = 0
lines.forEach(sf1 => {
   lines.forEach(sf2 => {
      if (sf1 == sf2) return
      const sum = [eval(sf1), eval(sf2)]
      let changed
      do {
         changed = split(sum)
      } while (explode(sum) || changed)
      best = Math.max(best, magnitude(sum))
   })
})
console.log(best)
