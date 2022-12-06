import { getInput } from '../2021/base.mjs'

const input = await getInput(6, 2022)

const n = 14
for (let i = 0; i < input.length - n; i++) {
   const size = new Set(input.slice(i, i + n)).size
   if (size == n) {
      console.log(i + n)
      break
   }
}
