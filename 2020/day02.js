const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   const lines = data
      .trim()
      .split('\n')
      .map(line => line.split(' '))
   const count = lines.reduce((count, line) => {
      const min = Number(line[0].split('-')[0])
      const max = Number(line[0].split('-')[1])
      const letter = line[1][0]
      if ((line[2][min - 1] == letter) != (line[2][max - 1] == letter))
         return count + 1
      return count
   }, 0)
   console.log(count)
})
