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
                  //console.log('Waiting for input')
                  return
               }
               this.set(args[0], this.input.pop())
               break
            case 4:
               //console.log('outputting', this.get(args[0]))
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

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.trim().split(',').map(s => parseInt(s))
   code[0] = 2

   let comp = new IntComputer(code, [])
   let grid = new Array(25).fill(null).map(_ => new Array(41).fill(0))
   let ball = {x: 0, y: 0};
   let paddle = {x: 0, y: 0};
   let blocks = true
   while (blocks) {
      comp.run()
      console.log(comp.output)

      while (comp.output.length > 0) {
         let tile = comp.output.pop()
         let y = comp.output.pop()
         let x = comp.output.pop()

         if (x == -1 && y == 0) {
            console.log('score', tile)
            continue
         }


         if (!grid[y])
            grid[y] = []
         grid[y][x] = tile
         if (tile == 3) {
            paddle.x = x
            paddle.y = y
         } else if (tile == 4) {
            ball.x = x
            ball.y = y
         }
      }

      console.log(ball, paddle)
      if (paddle.x < ball.x)
         comp.input.push(1)
      else if (paddle.x > ball.x)
         comp.input.push(-1)
      else
         comp.input.push(0)

      console.log(grid.map(line => line.map(t => ' #+_O'[t]).join('')).join('\n'))

      blocks = false
      for (let y = 0; y < grid.length && !blocks; y++) {
         for (let x = 0; x < grid[y].length && !blocks; x++) {
            if (grid[y][x] == 2)
               blocks = true
         }
      }
   }
   console.log('done')  
})
