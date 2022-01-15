import { getInput } from './base.mjs'
let input = (await getInput(21)).trim().split('\n')

const uniFromStr = s => s.split(',').map(Number)

let pos = input.map(line => Number(line.at(-1)))

let rollPos = []
for (let r1 = 1; r1 <= 3; r1++) {
   for (let r2 = 1; r2 <= 3; r2++) {
      for (let r3 = 1; r3 <= 3; r3++) {
         rollPos.push(r1 + r2 + r3)
      }
   }
}

const memo = {}
const getWins = uni => {
   if (memo[String(uni)]) return memo[String(uni)]
   let wins = [0, 0]
   outer: for (let r1 of rollPos) {
      for (let r2 of rollPos) {
         const newUni = [...uni]
         newUni[0] = ((uni[0] - 1 + r1) % 10) + 1
         newUni[2] += newUni[0]
         if (newUni[2] >= 21) {
            wins[0]++
            continue outer
         }
         newUni[1] = ((uni[1] - 1 + r2) % 10) + 1
         newUni[3] += newUni[1]
         if (newUni[3] >= 21) {
            wins[1]++
            continue
         }
         const newWins = getWins(newUni)
         wins[0] += newWins[0]
         wins[1] += newWins[1]
      }
   }
   memo[String(uni)] = wins
   return wins
}

console.log(getWins([...pos, 0, 0]))
