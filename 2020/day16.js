let [ranges, ticket, nearbyTickets] = process.argv[2].trim().split('\n\n')

ranges = ranges.split('\n').map(range =>
   range
      .split(':')[1]
      .split(' or ')
      .map(r => r.split('-').map(Number))
)

ticket = ticket.split('\n')[1].split(',').map(Number)

nearbyTickets = nearbyTickets
   .split('\n')
   .slice(1)
   .map(line => line.split(',').map(Number))
   .filter(nearby =>
      nearby.every(val => {
         for (let range of ranges.flat())
            if (val >= range[0] && val <= range[1]) return true
         return false
      })
   )

const nfields = nearbyTickets[0].length

const possible = new Array(nfields)
   .fill(0)
   .map(_ => new Set(new Array(nfields).fill(0).map((_, i) => i)))

nearbyTickets.forEach(nearby =>
   nearby.forEach((val, i) => {
      field_loop: for (let j = 0; j < nfields; j++) {
         for (let range of ranges[j])
            if (val >= range[0] && val <= range[1]) continue field_loop
         possible[j].delete(i)
      }
   })
)

//console.log(ranges)
console.log(nearbyTickets.length, nfields)
console.log(possible)

let product = 1
for (let i = 0; i < nfields; i++) {
   for (let j = 0; j < nfields; j++) {
      if (possible[j].size == 1) {
         const found = possible[j].values().next().value
         possible.forEach(p => p.delete(found))
         if (j < 6) product *= ticket[found]
         break
      }
   }
}
console.log(product)
