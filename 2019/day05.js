const fs = require('fs')

function runIntcode(code) {
   let pc = 0;
   while (code[pc] && code[pc] != 99) {
      console.log('executing ', pc, code[pc])
      let opcode = '0000' + String(code[pc])
      opcode = opcode.substr(0, opcode.length - 2)
      switch (code[pc] % 100) {
         case 1:
         case 2:
         case 7:
         case 8: {
            let arg1 = opcode[opcode.length - 1] == 1 ? code[pc + 1] : code[code[pc + 1]]
            let arg2 = opcode[opcode.length - 2] == 1 ? code[pc + 2] : code[code[pc + 2]]
            let dest = code[pc + 3]

            console.log('code[', dest, '] =', arg1, ' +*'[code[pc] % 100], arg2)
            if (code[pc] % 100 == 1)
               code[dest] = arg1 + arg2
            else if (code[pc] % 100 == 2)
               code[dest] = arg1 * arg2
            else if (code[pc] % 100 == 7)
               code[dest] = arg1 < arg2 ? 1 : 0
            else if (code[pc] % 100 == 8)
               code[dest] = arg1 == arg2 ? 1 : 0
            pc += 4
            break
         }
         case 3:
            code[code[pc + 1]] = 5
            pc += 2
            break
         case 4:
            console.log(code[code[pc + 1]])
            pc += 2
            break
         case 5:
         case 6: {
            let arg = opcode[opcode.length - 1] == 1 ? code[pc + 1] : code[code[pc + 1]]
           
            if (code[pc] % 100 == 5 && !arg || code[pc] % 100 == 6 && arg) {
               console.log('branch not taken', arg)
               pc += 3
               break
            }
            console.log('branch taken', arg)
            pc = opcode[opcode.length - 2] == 1 ? code[pc + 2] : code[code[pc + 2]]
            break
         }
         default:
            console.error('Error unknown instruction', code[pc])
            return
      }
   }

   return code[0]
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.split(',').map(s => s.trim()).map(s => parseInt(s)).filter(num => !isNaN(num))
   console.log(code)
   runIntcode(code)
})
