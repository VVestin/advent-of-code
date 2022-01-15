import { getInput } from './base.mjs'
let scanners = (await getInput(19)).split('\n\n').map(scanner =>
   scanner
      .split('\n')
      .slice(1)
      .map(line => line.split(',').map(Number))
)

const diff = (a, b) => a.map((x, i) => x - b[i])

const isPair = (s1, s2) => {
   let diffCounts = {}
   s1.forEach(p1 =>
      s2.forEach(p2 => {
         const d = diff(p1, p2)
         diffCounts[d] = (diffCounts[d] || 0) + 1
      })
   )
   diffCounts = Object.entries(diffCounts).filter(([d, count]) => count >= 12)
   if (!diffCounts.length) return false
   return diffCounts[0][0].split(',').map(Number)
}

const allPerms = point => {
   //console.log('getting allPerms', point)
   if (point.length == 0) return [point]
   return point
      .map((v, i) => {
         return allPerms([...point.slice(0, i), ...point.slice(i + 1)])
            .map(p => [
               [v, ...p],
               [-v, ...p],
            ])
            .flat()
      })
      .flat()
}

const transpose = s => {
   let out = new Array(s[0].length).fill(0).map(_ => [])
   for (let j = 0; j < s[0].length; j++)
      for (let i = 0; i < s.length; i++) out[j][i] = s[i][j]
   return out
}

let beacons = new Set(scanners[0].map(String))
scanners.splice(0, 1)
const scannerPoints = [[0, 0, 0]]
while (scanners.length) {
   for (let i = 0; i < scanners.length; i++) {
      for (let rotated of transpose(scanners[i].map(allPerms))) {
         const diff = isPair(
            [...beacons].map(p => p.split(',').map(Number)),
            rotated
         )
         if (diff) {
            scannerPoints.push(diff)
            console.log(i, diff)
            for (let p of rotated) {
               const relative = [p[0] + diff[0], p[1] + diff[1], p[2] + diff[2]]
               beacons.add(String(relative))
            }
            scanners.splice(i, 1)
            break
         }
      }
   }
}
beacons = [...beacons].map(p => p.split(',').map(Number))

//for (let b of beacons) console.log(b)
console.log(beacons.length)
let max = 0
for (let b1 of scannerPoints)
   for (let b2 of scannerPoints) {
      const d = b1.reduce((acc, v, i) => acc + Math.abs(b1[i] - b2[i]), 0)
      if (d > max) {
         console.log(b1, b2, d)
         max = d
      }
   }
console.log(max)
