import { getInput } from '../2021/base.mjs'

const input = (await getInput(24, 2015)).trim().split('\n').map(Number)
input.sort((a, b) => b - a)

const inputSum = input.reduce((a, b) => a + b)

function* partition(nums, sum, taken, maxLen) {
   if (nums.length == 0 || taken.length == maxLen) return
   if (nums[0] == sum) yield [...taken, nums[0]]
   if (nums[0] < sum)
      yield* partition(
         nums.slice(1),
         sum - nums[0],
         [...taken, nums[0]],
         maxLen
      )
   yield* partition(nums.slice(1), sum, taken, maxLen)
}

const gen = partition(input, inputSum / 4, [], 4)
let best = Infinity
for (let p = gen.next().value; p; p = gen.next().value) {
   const rest = input.filter(x => !p.includes(x))
   if (partition(rest, inputSum / 4, [], -1).next().done) continue
   const qe = p.reduce((a, b) => a * b)
   if (qe < best) best = qe
}
console.log(best)
