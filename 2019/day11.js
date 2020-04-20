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


// FIXME: Definitely would have been better to not change the internals of IntComputer
// to add graphics, whoops
class IntComputer {
   constructor(code, input) {
      this.code = code
      this.input = input
      this.pc = 0
      this.relBase = 0
      this.output = []
      this.dir = 0
      this.pos = {x: 50, y: 50}
      this.grid = new Array(100).fill(null).map(_ => new Array(100).fill(0))
      this.grid[50][50] = 1
      this.oddOut = false
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
               this.set(args[0], this.grid[this.pos.y][this.pos.x])
               break
            case 4:
               console.log('outputting', this.get(args[0]))
               this.oddOut = !this.oddOut
               if (this.oddOut) {
                  this.grid[this.pos.y][this.pos.x] = this.get(args[0])
               } else {
                  this.dir = (this.dir + 4 + (this.get(args[0]) == 0 ? -1 : 1)) % 4;
                  if (this.dir == 0)
                     this.pos.y -= 1
                  else if (this.dir == 1)
                     this.pos.x += 1
                  else if (this.dir == 2)
                     this.pos.y += 1
                  else if (this.dir == 3)
                     this.pos.x -= 1

                  console.log(this.pos, this.dir)
               }
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

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let computer = new IntComputer(data.trim().split(',').map(v => parseInt(v)), [])   
   console.log(computer.code)

   computer.run()
   console.log(computer.grid.map(line => line.map(x => ' #'[x]).join('')).join('\n'))

   let count = 0
   for (let pos in computer.grid) {
      count++
   }
   console.log(count)
})
