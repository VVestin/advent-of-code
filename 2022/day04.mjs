import { getInput } from '../2021/base.mjs'

const input = (await getInput(4, 2022))
   .split('\n')
   .map(line => line.split(',').map(pair => pair.split('-').map(Number)))

   .filter(([[a, b], [c, d]]) => !(b < c || d < a))

console.log(input.length)
