import { getInput } from '../2021/base.mjs'

const input = (await getInput(23, 2015)).trim().split('\n')

function exec(code) {
   const regs = { a: 1, b: 0 }
   for (let line = 0; line < code.length; line++) {
      const instr = code[line]
      const op = instr.slice(0, 3)
      const operands = instr.slice(4).split(', ')
      console.log(line, op, operands, regs)
      if (op == 'inc') regs[operands[0]]++
      if (op == 'hlf') regs[operands[0]] = Math.floor(regs[operands[0]] / 2)
      if (op == 'tpl') regs[operands[0]] *= 3
      if (op == 'jmp') line += Number(operands[0]) - 1
      if (op == 'jio' && regs[operands[0]] == 1) line += Number(operands[1]) - 1
      if (op == 'jie' && regs[operands[0]] % 2 == 0)
         line += Number(operands[1]) - 1
   }
   console.log(regs)
}

console.log(exec(input))
