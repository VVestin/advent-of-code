const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   data = data
      .trim()
      .split('\n')
      .map(line =>
         line
            .match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
            .slice(1, 6)
            .map(Number)
      )

   const fabric = new Array(1000).fill().map(_ => new Array(1000).fill(0))
   let count = 0
   data.forEach(([id, x, y, w, h]) => {
      for (let i = x; i < w + x; i++)
         for (let j = y; j < h + y; j++) {
            if (++fabric[i][j] == 2) count++
         }
   })
   console.log(count)

   data.forEach(([id, x, y, w, h]) => {
      for (let i = x; i < w + x; i++)
         for (let j = y; j < h + y; j++) if (fabric[i][j] != 1) return
      console.log(id)
   })
})
