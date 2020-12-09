const checkValid = (nums, i) => {
   for (let j = i - 25; j < i - 1; j++)
      for (let k = j + 1; k < i; k++)
         if (nums[j] + nums[k] == nums[i]) return true
   return false
}

const nums = process.argv[2]
   .trim()
   .split('\n')
   .map(line => Number(line))

//for (let i = 25; i < nums.length; i++)
//if (!checkValid(nums, i)) console.log('bad', i, nums[i])

const target = nums[619]

let min = 0
let max = 0
let acc = 0

while (acc != target) {
   if (acc < target) {
      acc += nums[max]
      max++
   } else {
      acc -= nums[min]
      min++
   }
   console.log(min, max, acc)
}

const range = nums.slice(min, max)

console.log(Math.min(...range) + Math.max(...range))
