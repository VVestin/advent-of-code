const fs = require('fs')
const IntComputer = require('./intcomp.js')

function getPath(comp) {
   comp.run()

   let str = comp.output.map(d => String.fromCharCode(d)).join('').trim()
   let grid = str.split('\n').map(l => ('.' + l + '.').split(''))
   grid.unshift(new Array(grid[0].length).fill('.'))
   grid.push(new Array(grid[0].length).fill('.'))

   let pos = {y: 11, x: 0}
   let dir = {y: 0, x: 1}

   let segs = []
   let segLen = 0
   for (let step = 0; 0 < 500; step++) {
      pos.x += dir.x
      pos.y += dir.y

      grid[pos.y][pos.x] = 'x'
      segLen++

      if (grid[pos.y + dir.y][pos.x + dir.x] == '.') {
         let newDir = dir
         for (let d of [{x: 1, y: 0}, {x: -1, y: 0}, {y: 1, x: 0}, {y: -1, x: 0}]) {
            if ((d.x != dir.x || d.y != dir.y) && grid[pos.y + d.y][pos.x + d.x] == '#') {
               segs.push(segLen / 2)
               if (dir.y * d.x - dir.x * d.y > 0)
                  segs.push('L')
               else
                  segs.push('R')
               grid[pos.y][pos.x] = 'x'
               segLen = 0

               newDir = d
               break
            }
         }
         if (newDir == dir)
            break
         dir = newDir
      }
   }
   segs.push(segLen / 2)

   console.log(grid.map(line => line.join('')).join('\n'))
   console.log(segs.join(','))

   return segs
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.trim().split(',').map(s => s.trim()).map(s => parseInt(s))
   code[0] = 2
   let comp = new IntComputer(code, [])

   comp.run()
   console.log(comp.output.map(a => String.fromCharCode(a)).join(''))
   comp.output = []

   function write(s) {
      s.split('').forEach(c => {comp.input.push(c.charCodeAt(0))})
   }

   write('A,B,A,C,A,B,C,C,A,B\n')
   write('R,8,L,10,R,8\n')
   write('R,12,R,8,L,8,L,12\n')
   write('L,12,L,10,L,8\n')
   write('n\n')

   comp.run()

   console.log(comp.output.map(a => String.fromCharCode(a)).join(''))

   console.log(comp.output[comp.output.length - 1])
})

/*
   A: R,8,L,10,R,8,
      B: R,12,R,8,L,8,L,12,
   A: R,8,L,10,R,8,
      C: L,12,L,10,L,8,
   A: R,8,L,10,R,8,
      B: R,12,R,8,L,8,L,12,
         C: L,12,L,10,L,8,
         C: L,12,L,10,L,8,
   A: R,8,L,10,R,8,
      B: R,12,R,8,L,8,L,12
*/
