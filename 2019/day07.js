const fs = require('fs')

class IntComputer {
   constructor(code, input) {
      this.code = code
      this.input = input
      this.pc = 0
      this.output = []
   }

   hasHalted() {
      return !this.code[this.pc] || this.code[this.pc] == 99
   }

   run() {
      while (!this.hasHalted()) {
         let instr = this.code[this.pc]
         let opcode = '0000' + String(instr)
         opcode = opcode.substr(0, opcode.length - 2)
         console.log('executing ', this.pc, instr)
         switch (instr % 100) {
            case 1:
            case 2:
            case 7:
            case 8: {
               let arg1 = opcode[opcode.length - 1] == 1 ? 
                  this.code[this.pc + 1] : this.code[this.code[this.pc + 1]]
               let arg2 = opcode[opcode.length - 2] == 1 ? 
                  this.code[this.pc + 2] : this.code[this.code[this.pc + 2]]
               let dest = this.code[this.pc + 3]

               console.log('code[', dest, '] =', arg1, ' +*'[instr % 100], arg2)
               if (instr % 100 == 1)
                  this.code[dest] = arg1 + arg2
               else if (instr % 100 == 2)
                  this.code[dest] = arg1 * arg2
               else if (instr % 100 == 7)
                  this.code[dest] = arg1 < arg2 ? 1 : 0
               else if (instr % 100 == 8)
                  this.code[dest] = arg1 == arg2 ? 1 : 0
               this.pc += 4
               break
            }
            case 3:
               if (this.input.length == 0)
                  return
               this.code[this.code[this.pc + 1]] = this.input.pop()
               this.pc += 2
               break
            case 4:
               this.output.push(this.code[this.code[this.pc + 1]])
               this.pc += 2
               break
            case 5:
            case 6: {
               let arg = opcode[opcode.length - 1] == 1 ? 
                  this.code[this.pc + 1] : this.code[this.code[this.pc + 1]]
              
               if (instr % 100 == 5 && !arg || instr % 100 == 6 && arg) {
                  console.log('branch not taken', arg)
                  this.pc += 3
                  break
               }
               console.log('branch taken', arg)
               this.pc = opcode[opcode.length - 2] == 1 ? 
                  this.code[this.pc + 2] : this.code[this.code[this.pc + 2]]
               break
            }
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
   //console.log(code)
   let maxPower = 0
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
   console.log('Max power:', maxPower)
})
