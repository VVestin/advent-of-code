import { getInput } from '../2021/base.mjs'

const input = (await getInput(7, 2015)).split('\n')

const gates = {}

const ops = {
   AND: (a, b) => a & b,
   OR: (a, b) => a | b,
   LSHIFT: (a, b) => a << b,
   RSHIFT: (a, b) => a >>> b,
}

input.forEach(line => {
   const [lhs, rhs] = line.split(' -> ')
   const args = lhs.split(' ')
   gates[rhs] = args
})
gates['b'] = 46065

function evaluate(wire) {
   if (!isNaN(Number(wire))) return Number(wire)
   if (!isNaN(Number(gates[wire]))) return gates[wire]
   const args = gates[wire]
   let val
   if (args.length == 1) val = evaluate(args[0])
   else if (args.length == 2) val = ~evaluate(args[1])
   else if (args.length == 3) {
      const [a1, op, a2] = args
      val = ops[op](evaluate(a1), evaluate(a2))
   }
   gates[wire] = val
   return val
}

console.log(evaluate('a'))
