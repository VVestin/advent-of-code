import { getInput } from './base.mjs'
let [xr, yr] = (await getInput(17))
   .slice(13)
   .split(', ')
   .map(s => s.slice(2).split('..'))

const out = []
for (let xv = 1; xv <= xr[1]; xv++) {
   searchLoop: for (let yv = -300; yv <= 300; yv++) {
      let [x, y] = [0, 0]
      let [xv1, yv1] = [xv, yv]
      while (x <= xr[1] && y >= yr[0]) {
         if (xv == 6 && yv == 9) console.log(x, y, xv1, yv1, xv, yv)
         if (x >= xr[0] && y <= yr[1]) {
            out.push([xv, yv])
            continue searchLoop
         }
         x += xv1
         y += yv1
         xv1 = Math.max(0, xv1 - 1)
         yv1--
      }
   }
}
const best = out.sort((a, b) => b[1] - a[1])[0][1]
console.log(best, (best * (best + 1)) / 2, out.length)
