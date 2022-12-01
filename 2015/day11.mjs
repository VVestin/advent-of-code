import { getInput } from '../2021/base.mjs'

let input = await getInput(11, 2015)

function pwdToNum(pwd) {
   let n = 0
   pwd.split('').forEach(c => {
      n = n * 26 + c.charCodeAt(0) - 'a'.charCodeAt(0)
   })
   return n
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
function numToPwd(n) {
   if (n == 0) return ''
   return numToPwd(Math.floor(n / 26)) + alphabet[n % 26]
}

function inc(pwd) {
   return numToPwd(pwdToNum(pwd) + 1)
}

console.log(input, inc(input))
