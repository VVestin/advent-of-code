import { getInput } from '../2021/base.mjs'

const input = (await getInput(3, 2015)).split('')

let x = 100,
   y = 100
const visited = { '100,100': true }
for (let i = 0; i < input.length; i += 2) moveSanta(input[i])
x = 100
y = 100
for (let i = 0; i < input.length; i += 2) moveSanta(input[i + 1])

function moveSanta(c) {
   if (c == '>') x += 1
   if (c == '<') x -= 1
   if (c == '^') y -= 1
   if (c == 'v') y += 1
   visited[x + ',' + y] = true
}

console.log(Object.keys(visited).length)
