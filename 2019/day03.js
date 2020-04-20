const fs = require('fs')

function intersect(a, b) {
   if (a.x + a.w < b.x || a.x > b.x + b.w || 
       a.y + a.h < b.y || a.y > b.y + b.h)
      return false

   console.log('intersection!', a, b)

   if (a.w == 0 && b.h == 0)
      return {x: a.x, y: b.y}
   else if (a.h == 0 && b.w == 0)
      return {x: b.x, y: a.y}
   else if (a.w == 0)
      return {x: Math.abs(a.x) < Math.abs(b.x) ? a.x : b.x, y: a.y}
   else if (a.h == 0)
      return {x: a.x, y: Math.abs(a.y) < Math.abs(b.y) ? a.y : b.y}
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let lines = data.split('\n').map(line => line.split(','))
      .map(line => {
         let segments = []
         let pos = {x: 0, y: 0}
         for (let seg of line) {
            let len = parseInt(seg.substr(1))
            let start = {...pos} // FIXME hack to make the 2nd part work right, bad design :(
            if (seg[0] == 'D')
               pos.y -= len
            if (seg[0] == 'L')
               pos.x -= len

            segments.push({...pos, start: start,
               w: seg[0] == 'L' || seg[0] == 'R' ? len : 0, 
               h: seg[0] == 'U' || seg[0] == 'D' ? len : 0})

            if (seg[0] == 'U')
               pos.y += len
            if (seg[0] == 'R')
               pos.x += len
         }
         return segments
      })
   console.log(lines)
   let minLen = 0
   let aLen = 0;
   for (let a of lines[0]) {
      let bLen = 0
      for (let b of lines[1]) {
         let inter = intersect(a, b)
         if (inter) {
            let len = aLen + Math.abs(a.start.x - inter.x + a.start.y - inter.y)
                    + bLen + Math.abs(b.start.x - inter.x + b.start.y - inter.y)
            if (minLen == 0 || len < minLen)
               minLen = len
         }
         bLen += b.w + b.h
      }
      aLen += a.w + a.h
   }
   console.log('min dist: ', minLen)
})
