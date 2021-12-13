import { getInput } from './base.mjs'
const input = (await getInput(3)).split('\n')

function mostCommonBit(lines, pos) {
   const bitCounts = new Array(lines[0].length)
      .fill(0)
      .map(_ => ({ 0: 0, 1: 0 }))
   lines.forEach(line => {
      line.split('').forEach((c, i) => {
         bitCounts[i][c]++
      })
   })
   if (bitCounts[pos]['0'] > bitCounts[pos]['1']) return '0'
   return '1'
}

function getRating(flipped) {
   let lines = input.map(x => x)
   for (let i = 0; lines.length > 1; i++) {
      let bit = mostCommonBit(lines, i)
      lines = lines.filter(line => (line[i] == bit) ^ flipped)
   }
   return parseInt(lines[0], 2)
}

let on = getRating(false)
let sn = getRating(true)

console.log(on * sn)
