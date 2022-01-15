import { getInput } from './base.mjs'
const hexToBi = x => ('000' + parseInt(x, 16).toString(2)).slice(-4)
let input = (await getInput(16)).split('').map(hexToBi).join('')
const OPS = [
   (a, b) => a + b,
   (a, b) => a * b,
   (a, b) => Math.min(a, b),
   (a, b) => Math.max(a, b),
   null,
   (a, b) => +(a > b),
   (a, b) => +(a < b),
   (a, b) => +(a == b),
]
function decode(n) {
   const v = parseInt(n.slice(0, 3), 2)
   const id = parseInt(n.slice(3, 6), 2)
   console.log(v, id)
   if (id == 4) {
      let lit = 0
      let i = 6
      do {
         lit += n.slice(i + 1, i + 5)
         i += 5
      } while (n[i - 5] == '1')
      return [parseInt(lit, 2), n.slice(i)]
   } else {
      const op = OPS[id]
      if (n[6] == '0') {
         // subpackets by length
         const len = parseInt(n.slice(7, 22), 2)
         const sub = []
         let rest = n.slice(22, 22 + len)
         while (rest) {
            const d = decode(rest)
            rest = d[1]
            sub.push(d[0])
         }
         return [sub.reduce(op), n.slice(22 + len)]
      } else {
         // subpackets by number
         const num = parseInt(n.slice(7, 18), 2)
         const sub = []
         let rest = n.slice(18)
         for (let i = 0; i < num; i++) {
            const d = decode(rest)
            rest = d[1]
            sub.push(d[0])
         }
         return [sub.reduce(op), rest]
      }
   }
}
console.log(decode(input))
