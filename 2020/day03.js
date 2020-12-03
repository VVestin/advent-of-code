const fs = require('fs')

const countSlope = (lines, down, right) =>
   lines
      .filter((x, i) => i % down == 0)
      .reduce(
         ([x, count], line) => [
            (x + right) % line.length,
            line[x] == '#' ? count + 1 : count,
         ],
         [0, 0]
      )[1]

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let lines = data
      .trim()
      .split('\n')
      .map(line => line.split(''))
   allSlopes = [
      countSlope(lines, 1, 1),
      countSlope(lines, 1, 3),
      countSlope(lines, 1, 5),
      countSlope(lines, 1, 7),
      countSlope(lines, 2, 1),
   ]
   console.log(allSlopes)
   console.log(allSlopes.reduce((a, b) => a * b))
})
