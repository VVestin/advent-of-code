const spoken = {}

const input = process.argv[2]
const initial = input.split(',').map(Number)
for (let i = 0; i < initial.length - 1; i++) spoken[initial[i]] = i

let last = initial[initial.length - 1]
for (let turn = initial.length - 1; turn < 30_000_000; turn++) {
   if (turn % 1_000_000 == 0 || turn == 30_000_000 - 1) console.log(turn, last)
   const lastSpoken = spoken[last]
   spoken[last] = turn
   if (lastSpoken !== undefined) {
      last = turn - lastSpoken
   } else {
      last = 0
   }
}
