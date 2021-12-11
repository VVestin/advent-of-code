let input = require('./base')(10).split('\n')

let m = {
   ')': '(',
   ']': '[',
   '}': '{',
   '>': '<',
}
let vals = {
   '(': 1,
   '[': 2,
   '{': 3,
   '<': 4,
}
let scores = []
input.forEach(line => {
   let corrupt = false
   const stack = []
   line.split('').forEach(c => {
      if ('([{<'.includes(c)) {
         stack.push(c)
      } else {
         const d = m[c]
         //console.log(c, d, stack, val)
         if (stack.pop() != d) corrupt = true
      }
   })
   if (!corrupt) {
      console.log(stack, corrupt)
      scores.push(stack.reverse().reduce((acc, c) => 5 * acc + vals[c], 0))
   }
})
scores.sort((x, y) => x - y)
console.log(scores[Math.floor(scores.length / 2)])
