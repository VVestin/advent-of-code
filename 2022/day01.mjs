import { getInput } from '../2021/base.mjs'

const input = (await getInput(1, 2022)).split('\n\n').map(line =>
   line
      .split('\n')
      .map(Number)
      .reduce((a, b) => a + b)
)

input.sort((a, b) => a - b)
console.log(input.at(-1) + input.at(-2) + input.at(-3))
