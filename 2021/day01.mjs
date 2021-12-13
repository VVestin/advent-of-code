import { getInput } from './base.mjs'
let input = (await getInput(1)).split('\n').map(Number)
let count = 0
for (let i = 3; i < input.length; i++) if (input[i] > input[i - 3]) count++
console.log(count)
