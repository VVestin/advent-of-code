const fs = require('fs')

const INST_ARGS = []
INST_ARGS[1] = 3 // ADD
INST_ARGS[2] = 3 // MULT
INST_ARGS[3] = 1 // IN
INST_ARGS[4] = 1 // OUT
INST_ARGS[5] = 2 // BRANCH_TRUE
INST_ARGS[6] = 2 // BRANCH_FALSE
INST_ARGS[7] = 3 // LESS_THAN
INST_ARGS[8] = 3 // EQUALS
INST_ARGS[9] = 1 // REL_BASE_OFFSET
INST_ARGS[99] = 0 // HALT


class IntComputer {
   constructor(code, input) {
      this.code = code
      this.input = input
      this.pc = 0
      this.relBase = 0
      this.output = []
   }

   hasHalted() {
      return !this.code[this.pc] || this.code[this.pc] == 99
   }

   get(addr) {
      if (addr < 0)
         throw new Error('Cannot access memory address ' + addr + ' (with relative base' + this.relBase + ')')
      if (this.code[addr] === undefined)
         return 0

      return this.code[addr]
   }

   set(addr, val) {
      if (addr < 0)
         throw new Error('Cannot access memory address ' + addr + ' (with relative base' + this.relBase + ')')
      this.code[addr] = val
   }

   run() {
      while (!this.hasHalted()) {
         let instr = this.code[this.pc]
         let opcode = '0000' + String(instr)
         opcode = opcode.substr(0, opcode.length - 2)
         let args = new Array(INST_ARGS[instr % 100]).fill(0)
         for (let i = 1; i <= args.length; i++) {
            if (opcode[opcode.length - i] == 0)
               args[i - 1] = this.get(this.pc + i)
            else if (opcode[opcode.length - i] == 1)
               args[i - 1] = this.pc + i
            else if (opcode[opcode.length - i] == 2)
               args[i - 1] = this.get(this.pc + i) + this.relBase
         }
         //console.log(this.pc, 'executing', instr, args)
         this.pc += args.length + 1
         switch (instr % 100) {
            case 1:
            case 2:
            case 7:
            case 8: {
               //console.log('code[', args[2], '] =', this.get(args[0]), ' +*    <='[instr % 100], this.get(args[1]))
               if (instr % 100 == 1)
                  this.set(args[2], this.get(args[0]) + this.get(args[1]))
               else if (instr % 100 == 2)
                  this.set(args[2], this.get(args[0]) * this.get(args[1]))
               else if (instr % 100 == 7)
                  this.set(args[2], this.get(args[0]) < this.get(args[1]) ? 1 : 0)
               else if (instr % 100 == 8)
                  this.set(args[2], this.get(args[0]) == this.get(args[1]) ? 1 : 0)
               break
            }
            case 3:
               if (this.input.length == 0) {
                  this.pc -= 2
                  console.log('Waiting for input')
                  return
               }
               this.set(args[0], this.input.pop())
               break
            case 4:
               console.log('outputting', this.get(args[0]))
               this.output.push(this.get(args[0]))
               break
            case 5:
               if (!this.get(args[0]))
                  14
                  //console.log('branch not taken', args[1])
               else {
                  //console.log('branch taken', args[1])
                  this.pc = this.get(args[1])
               }
               break
            case 6:
               if (this.get(args[0]))
                  10
                  //console.log('branch not taken', args[1])
               else {
                  //console.log('branch taken', args[1])
                  this.pc = this.get(args[1])
               }
               break
            case 9:
               this.relBase += this.get(args[0])
               break
            default:
               console.error('Error unknown instruction', instr)
               this.pc = null
               return
         }
      }
   }
}

function perms(arr) {
   if (arr.length <= 1)
      return [arr]
   let ps = []
   for (let i = 0; i < arr.length; i++) {
      let sub = [...arr]
      sub.splice(i, 1)
      perms(sub).forEach((a) => {
         a.unshift(arr[i])
         ps.push(a)
      })
   }
   return ps
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.split(',').map(s => s.trim()).map(s => parseInt(s)).filter(num => !isNaN(num))
   let c = new IntComputer(code, [2])
   c.run()
   console.log('output', c.output)
   //console.log(code)
   /*let maxPower = 0
   for (let sequence of perms([5, 6, 7, 8, 9])) {
      let amps = new Array(5).fill(null).map((_, i) => new IntComputer([...code], [sequence[i]]))
      let power = 0
      while (!amps[4].hasHalted()) {
         for (let amp of amps) {
            amp.input.unshift(power)
            amp.run()
            power = amp.output.pop() || power
            console.log('Running', amp.hasHalted())
         }
      }
      maxPower = Math.max(maxPower, power)
   }
   console.log('Max power:', maxPower)*/
})
