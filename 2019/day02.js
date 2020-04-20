const fs = require('fs')

function runIntcode(code, arg1, arg2) {
   code[1] = arg1
   code[2] = arg2

   for (let i = 0; code[i] && code[i] != 99; i += 4) {
      let arg1 = code[i + 1]
      let arg2 = code[i + 2]
      let dest = code[i + 3]
      if (code[i] == 1)
         code[dest] = code[arg1] + code[arg2]
      else if (code[i] == 2)
         code[dest] = code[arg1] * code[arg2]
   }

   return code[0]
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.split(',').map(s => s.trim()).map(s => parseInt(s)).filter(num => !isNaN(num))
   console.log('Searching for values')
   for (let i = 1; i < 100; i++) {
      for (let j = 1; j < 100; j++) {
         if (runIntcode([...code], i, j) == 19690720)
            console.log('found it!', i, j)
      }
   }
})
