const fs = require('fs')

function getCommon(a, b) {
   for (let ea of a)
      for (let eb of b)
         if (ea[0] == eb[0])
            return [ea, eb]
   return null
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   orbits = data.trim().split('\n').map(l => l.split(')'))
   let objects = {}
   for (let orbit of orbits) {
      if (!objects[orbit[1]]) 
         objects[orbit[1]] = [orbit[0]]
      else
         objects[orbit[1]].push(orbit[0])
   }

   let you = ['YOU']
   let san = ['SAN']
   let allYou = [['YOU', 0]]
   let allSan = [['SAN', 0]]
   let depth = 0
   let common = null
   while (!common) {
      console.log(allYou, san)
      you = you.map(o => objects[o]).reduce((acc, l) => acc.concat(l), [])
      san = san.map(o => objects[o]).reduce((acc, l) => acc.concat(l), [])
      allYou = allYou.concat(you.map(o => [o, depth]))
      allSan = allSan.concat(san.map(o => [o, depth]))
      console.log(allYou, allSan)
      common = getCommon(allYou, allSan)
      depth++
   }
   console.log(depth, common)
})
