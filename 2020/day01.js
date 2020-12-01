const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let costs = data.split('\n').map(Number)
   console.log(costs)
   costs.forEach(c1 =>
      costs.forEach(c2 =>
         costs.forEach(c3 => {
            if (c1 + c2 + c3 == 2020) console.log(c1, c2, c1 * c2 * c3)
         })
      )
   )
})
