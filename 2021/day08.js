let input = require('./base')(8).split('\n')

const ins = input.map(line => line.split('|')[0].trim().split(' '))
const outs = input.map(line => line.split('|')[1].trim().split(' '))

const same = (a, b) => {
   if (a.length != b.length) return false
   for (let char of a.split('')) {
      if (!b.includes(char)) return false
   }
   return true
}

const diff = (a, b) => {
   let set = []
   a.split('').forEach(char => {
      if (!b.includes(char)) set.push(char)
   })
   b.split('').forEach(char => {
      if (!a.includes(char)) set.push(char)
   })
   return set
}

count = 0
for (let i = 0; i < ins.length; i++) {
   const line = ins[i]
   const nums = new Array(10).fill(null)
   nums[1] = line.filter(digit => digit.length == 2)[0]
   nums[4] = line.filter(digit => digit.length == 4)[0]
   nums[7] = line.filter(digit => digit.length == 3)[0]
   nums[8] = line.filter(digit => digit.length == 7)[0]

   const top = diff(nums[1], nums[7])[0]
   nums[3] = line.filter(
      digit => digit.length == 5 && diff(digit, nums[1]).length == 3
   )[0]
   nums[9] = line.filter(
      digit => digit.length == 6 && diff(digit, nums[3]).length == 1
   )[0]
   const topLeft = diff(nums[9], nums[3])[0]
   const bottom = diff(nums[9], nums[4] + topLeft + top)[0]
   const bottomLeft = diff(nums[8], nums[9])[0]
   nums[0] = line.filter(digit =>
      same(digit, nums[7] + topLeft + bottomLeft + bottom)
   )[0]
   nums[6] = line.filter(
      digit => digit.length == 6 && digit != nums[0] && digit != nums[9]
   )[0]
   const topRight = diff(nums[8], nums[6])[0]
   const middle = diff(nums[8], nums[0])[0]
   const bottomRight = diff(nums[1], topRight)
   nums[5] = top + middle + bottom + topLeft + bottomRight
   nums[2] = top + middle + bottom + bottomLeft + topRight

   count += Number(
      outs[i]
         .map(digit => {
            for (let j = 0; j < 10; j++) if (same(digit, nums[j])) return j
         })
         .join('')
   )
}

// outs.forEach(line =>
//    line.forEach(digit => {
//       if ([2, 3, 4, 7].includes(digit.length)) count++
//    })
// )
console.log(count)
