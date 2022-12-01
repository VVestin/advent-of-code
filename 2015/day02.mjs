import { getInput } from '../2021/base.mjs'

const input = (await getInput(2, 2015)).split('\n')

console.log(
   input
      .map(line => {
         const [l, w, h] = line.split('x').map(Number)
         const sides = [l + w, w + h, l + h]
         return 2 * Math.min(...sides) + l * w * h
      })
      .reduce((a, b) => a + b)
)
