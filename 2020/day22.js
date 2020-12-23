const [santa, crab] = process.argv[2]
   .split('\n\n')
   .map(player => player.split('\n').slice(1).map(Number))

const scoreHand = hand =>
   hand.reduce((a, card, i) => a + card * (hand.length - i), 0)

const recursiveCombat = (santa, crab) => {
   //console.log('------------------------------')
   const seen = new Set()
   while (santa.length > 0 && crab.length > 0) {
      //console.log(santa, crab)
      if (santa.length + crab.length == 50) console.log(santa, crab)

      if (seen.has(santa + ' ' + crab)) return true
      seen.add(santa + ' ' + crab)

      const santaPull = santa.shift()
      const crabPull = crab.shift()

      const santaWin =
         santaPull <= santa.length && crabPull <= crab.length
            ? recursiveCombat(
                 [...santa.slice(0, santaPull)],
                 [...crab.slice(0, crabPull)]
              )
            : santaPull > crabPull
      if (santaWin) {
         santa.push(santaPull)
         santa.push(crabPull)
      } else {
         crab.push(crabPull)
         crab.push(santaPull)
      }
   }
   //console.log(2 - +(santa.length > 0) + ' Won')
   return santa.length > 0
}

recursiveCombat(santa, crab)
console.log(santa, crab)
console.log(scoreHand(santa))
console.log(scoreHand(crab))
