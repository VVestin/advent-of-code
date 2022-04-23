import { getInput } from './base.mjs'

const OPS = {
   add: (x, y) => x + y,
   mul: (x, y) => x * y,
   div: (x, y) => x / y,
   mod: (x, y) => x % y,
   eql: (x, y) => BigInt(+(x == y)),
}

const monadProg = (await getInput(24))
   .trim()
   .split('\n')
   .map(line => line.split(' '))

const exec = (program, input, initStore = {}) => {
   const store = initStore
   store.w = store.w ?? 0n
   store.x = store.x ?? 0n
   store.y = store.y ?? 0n
   store.z = store.z ?? 0n
   for (let [op, a1, a2] of program) {
      //console.log(op, a1, a2)
      if (op == '#' || op == '') continue
      if (op == 'inp') store[a1] = BigInt(input.shift())
      else {
         store[a1] = OPS[op](store[a1], store[a2] ?? BigInt(a2))
      }
   }
   return store
}

const digitProgs = new Array(14).fill(0).map(_ => [])
monadProg.forEach((line, i) => digitProgs[Math.floor(i / 18)].push(line))
const params = digitProgs.map(prog =>
   prog.filter((line, i) => [4, 5, 15].includes(i)).map(line => BigInt(line[2]))
)

const swap = (a, i, j) => {
   const t = a[i]
   a[i] = a[j]
   a[j] = t
}
//                          4       -6 -2 -7 -3     1  -3
//              0  1  2  3  4  5  6  7  8  9  10 11 12 13
const digits = [1, 1, 8, 1, 5, 6, 7, 1, 1, 1, 7, 1, 2, 1].map(BigInt)
console.log(digits.join(''))

let z = 0n
for (let i = 0; i < 14; i++) {
   const x = (z % 26n) + params[i][1]
   console.log(
      params[i],
      '\t',
      z.toString(26),
      digits[i],
      'x=' + x,
      //(digits[i] + params[i][2]).toString(26),
      +(digits[i] == x),
      (i == 0 ? 0n : params[i - 1][2]) + params[i][1]
   )
   if (i == 6) console.log()
   z /= params[i][0]
   if (x != digits[i]) {
      z *= 26n
      z += digits[i] + params[i][2]
   }
}
console.log('param', z)

console.log(
   'digit ',
   digitProgs.reduce((z, prog, i) => exec(prog, [digits[i]], { z }).z, 0n)
)

console.log('full  ', exec(monadProg, [...digits]).z)

/*
for (let num = 99_999_999_999_999n; num > 0; num--) {
   const digits = String(num).split('').map(Number)
   console.log(digits)

   if (digits.includes(0)) break
   exec(monadProg, digits)
}*/

//exec(input, [10, 20])
