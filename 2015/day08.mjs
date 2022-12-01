import { getInput } from '../2021/base.mjs'

const input = (await getInput(8, 2015)).trim().split('\n')

let totalCount = 0
for (let line of input) {
   let count = 0
   for (let i = 0; i < line.length; i++) {
      if (line[i] == '\\') {
         if (line[i + 1] == 'x') {
            i += 3
            count += 1
         } else {
            count += 2
            i++
         }
      }
   }
   count += 4
   console.log(line, count)
   console.log()
   totalCount += count
}

console.log(totalCount)
