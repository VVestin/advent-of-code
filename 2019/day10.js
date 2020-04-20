const fs = require('fs')

function gcd(a, b) {
   a = Math.abs(a)
   b = Math.abs(b)
   if (a == 0) 
      return b
   if (b == 0)
      return a
   return gcd(b, a % b)
}

function visible(asteroidMap, p1, p2) {
   let r = p2.r - p1.r
   let c = p2.c - p1.c
   let d = gcd(r, c)
   for (let i = 1; i < d; i++) {
      if (asteroidMap[p1.r + r * i / d][p1.c + c * i / d])
         return false
   }
   return true
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let asteroidMap = data.split('\n').map(line => line.split('')).map(row => row.map(x => x == '#'))
   let counts = asteroidMap.map(line => new Array(line.length).fill(0))
   let h = counts.length
   let w = counts[0].length
   for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
         if (!asteroidMap[row][col])
            continue
         for (let c = 1; col + c < w; c++) {
            if (asteroidMap[row][col + c]) {
               counts[row][col]++
               counts[row][col + c]++
               break
            }
         }
         for (let r = 1; row + r < h; r++) {
            for (let c = -col; col + c < w; c++) {
               if (gcd(r, c) != 1 
                  && r != 1)
                  continue
               for (let i = 1; row + i * r < h && col + i * c >= 0 && col + i * c < w; i++) {
                  if (asteroidMap[row + r * i][col + c * i]) { 
                     if (row == 0 && col == 1)
                        console.log(r, c, ' ', row + r * i, col + c * i)
                     counts[row][col]++
                     counts[row + r * i][col + c * i]++
                     break
                  }
               }
            }
         }
      }
   }

   let max = 0
   let maxPos = {r: 0, c: 0}
   for (let r = 0; r < h; r++) 
      for (let c = 0; c < w; c++)
         if (counts[r][c] > max) {
            max = counts[r][c]
            maxPos = {r, c}
         }

   console.log(gcd(3, 2))
   console.log(max, maxPos)

   let vis = []
   for (let r = 0; r < h; r++) {
      for (let c = 0; c < h; c++) {
         if (asteroidMap[r][c] && (r != maxPos.r || c != maxPos.c))
            vis.push({r, c, angle: Math.atan2((maxPos.c - c - .01), (r - maxPos.r))})
      }
   }
   vis = vis.filter(pos => visible(asteroidMap, maxPos, pos))
   vis.sort((p1, p2) => p1.angle - p2.angle)
   for (let i = 0; i <= 200; i++) {
      let p = vis.shift()
      console.log(i, p)
      asteroidMap[p.r][p.c] = false
   }
})
