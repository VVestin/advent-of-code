import { getInput } from '../2021/base.mjs'

const input = await getInput(1, 2015)

console.log(
   input.split('').reduce((acc, c, i) => {
      if (acc == 0) console.log(i + 1)
      return c == '(' ? acc + 1 : acc - 1
   }, 0)
)
