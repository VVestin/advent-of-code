const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let ids = data.trim().split('\n').map(line => line.split(''))
   for (let id of ids) {
      search:
      for (let id2 of ids) {
         if (id == id2)
            continue
         let differ = false
         for (let i in id) {
            if (id[i] != id2[i])
               if (!differ)
                  differ = true
               else
                  continue search
         }
         if (!differ)
            continue
         console.log('found!')
         console.log(id.join(''), id2.join(''))
      }
   }
})
