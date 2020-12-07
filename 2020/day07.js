let bags = process.argv[2]
   .trim()
   .split('.')
   .slice(0, -1)
   .map(s => s.split('contain'))
   .reduce(
      (map, pair) =>
         map.set(
            pair[0].trim(),
            pair[1]
               .split(',')
               .map(s => s.trim())
               .map(s => {
                  if (s == 'no other bags') return [1, 'NO OTHER BAGS']
                  const amount = Number(s[0])
                  return [amount, s.slice(2) + (amount == 1 ? 's' : '')]
               })
         ),
      new Map()
   )

const foundBags = [[1, 'shiny gold bags']]
let count = 0
while (foundBags.length) {
   const [amt, bag] = foundBags.pop()
   count += amt
   bags.get(bag).forEach(([innerAmt, innerBag]) => {
      if (innerBag != 'NO OTHER BAGS')
         foundBags.unshift([innerAmt * amt, innerBag])
   })
}

console.log(count - 1)
