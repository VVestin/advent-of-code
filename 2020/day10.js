const f = n =>
   n <= 5
      ? [0, 1, 2, 4, 7, 11][n]
      : f(n - 1) + 2 * f(n - 2) - 2 * f(n - 3) - f(n - 4) + f(n - 5)

const joltages = process.argv[2].trim().split('\n').map(Number)
joltages.sort((a, b) => a - b)
joltages.unshift(0)
joltages.push(joltages[joltages.length - 1] + 3)

const diffs = new Array(joltages.length - 1)
for (let i = 0; i < joltages.length - 1; i++)
   diffs[i] = joltages[i + 1] - joltages[i]

console.log(joltages, diffs)

console.log(diffs.filter(x => x == 1).length * diffs.filter(x => x == 3).length)

let acc = 1
let runLen = 0
for (let i = 0; i < diffs.length; i++) {
   if (diffs[i] == 1) runLen++
   if (diffs[i] == 3 && runLen != 0) {
      console.log(runLen)
      acc *= f(runLen)
      runLen = 0
   }
}

console.log(acc)
console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(f))
