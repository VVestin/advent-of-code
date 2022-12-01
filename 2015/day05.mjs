import { getInput } from '../2021/base.mjs'

const input = (await getInput(5, 2015)).split('\n')

function isNice(line) {
   let pairRepeat = false
   let smallRepeat = false
   for (let i = 2; i < line.length; i++) {
      const pair = line.slice(i - 1, i + 1)
      if (line.slice(0, i - 1).indexOf(pair) >= 0) pairRepeat = true
      if (line[i - 2] == line[i]) smallRepeat = true
   }
   return pairRepeat && smallRepeat
}

console.log(input.reduce((count, line) => count + isNice(line), 0))
