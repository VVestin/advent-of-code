const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   data = data.trim().split('\n').map(v => parseInt(v))
   let f = 0
   let found = [true]
   outer:
   while (true) {
   for (let d of data) {
      f += d
      console.log(f)
      if (found[f]) {
         console.log('DONE')
         break outer
      }
      found[f] = true
   }
     }
})
