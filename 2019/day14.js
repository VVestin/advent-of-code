const fs = require('fs')

function bootify(pair) {
   return {name: pair[1], amt: parseInt(pair[0])}
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   data = data.trim()
   let ls = data.split('\n').map(line => line.split('=>')[0].split(',')
      .map(x => bootify(x.trim().split(' '))))
   let rs = data.split('\n').map(line => bootify(line.split('=>')[1].trim().split(' ')))

   let reactions = {}
   for (let i = 0; i < rs.length; i++) {
      console.log(rs[i], ls[i])
      if (!reactions[rs[i].name])
         reactions[rs[i].name] = []
      reactions[rs[i].name].push({
         amt: rs[i].amt, 
         reactants: ls[i],
      })
   }
   console.log(reactions)

   function minOre(required) { 
      let toReplace = null
      for (let mat in required)
         if (mat != 'ORE' && required[mat] > 0) {
            toReplace = mat
            break
         }
      if (!toReplace)
         return required['ORE']

      let min = -1
      for (let reaction of reactions[toReplace]) {
         let newRequired = Object.assign({}, required)
         let times = required[toReplace] / reaction.amt
         newRequired[toReplace] -= times * reaction.amt;
         console.log(reaction)

         for (let reactant of reaction.reactants) {
            if (!newRequired[reactant.name])
               newRequired[reactant.name] = 0
            newRequired[reactant.name] += times * reactant.amt
         }

         console.log('doing reaction', toReplace, reaction)
         let ore = minOre(newRequired)
         if (min == -1 || ore < min) {
            min = ore
         }
      }
      return min
   }

   let min = minOre({'FUEL': 1})
   console.log(min, 1000000000000 / min)

   //console.log(ls, rs)
})
