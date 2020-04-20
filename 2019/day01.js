const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let fuel = 0
   for (let mass of data.split('\n')) {
      if (isNaN(parseInt(mass)))
         continue
      while (mass > 0) {
         mass = Math.floor(Number(mass) / 3) - 2
         fuel += Math.max(mass, 0);
      }
   }

   console.log(fuel)
})
