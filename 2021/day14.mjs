import { getInput } from './base.mjs'
let [polymer, rules] = (await getInput(14)).split('\n\n')

const pairs = {}
rules = rules.split('\n').map(line => line.split(' -> '))

let pairCount = {}
for (let i = 0; i < polymer.length - 1; i++) {
   const pair = polymer.slice(i, i + 2)
   pairCount[pair] = (pairCount[pair] || 0n) + 1n
}

for (let j = 0; j < 40; j++) {
   const newPairCount = {}
   for (let [pair, count] of Object.entries(pairCount))
      newPairCount[pair] = count
   for (let [pair, out] of rules) {
      const count = pairCount[pair]
      if (!count) continue
      const new1 = pair[0] + out
      const new2 = out + pair[1]
      newPairCount[pair] -= count
      newPairCount[new1] = (newPairCount[new1] || 0n) + count
      newPairCount[new2] = (newPairCount[new2] || 0n) + count
   }
   pairCount = newPairCount
}

console.log(pairCount)
let counts = {}
for (let [pair, count] of Object.entries(pairCount)) {
   counts[pair[0]] = (counts[pair[0]] || 0n) + count
}
counts[polymer.at(-1)] += 1n
console.log(counts)
const min = Object.values(counts).reduce((acc, b) => (b < acc ? b : acc))
const max = Object.values(counts).reduce((acc, b) => (b > acc ? b : acc))
console.log(Number(String(max - min)))
