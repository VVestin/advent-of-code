import { getInput } from '../2021/base.mjs'

const input = (await getInput(21, 2015))
   .trim()
   .split('\n')
   .map(line => Number(line.split(': ')[1]))

function fight(hp, damage, armor) {
   let [bossHP, bossDamage, bossArmor] = input
   while (true) {
      bossHP -= Math.max(1, damage - bossArmor)
      if (bossHP <= 0) return true
      hp -= Math.max(1, bossDamage - armor)
      if (hp <= 0) return false
   }
}

let damageCost = {
   4: 8,
   5: 33,
   6: 58,
   7: 108,
   8: 133,
   9: 158,
}
let armorCost = {
   0: 0,
   1: 20,
   2: 40,
   3: 80,
   4: 100,
   5: 120,
   6: 133,
   7: 135,
   8: 162,
   9: 202,
   10: 222,
}

let best = 0
for (let d in damageCost) {
   for (let a in armorCost) {
      if (fight(100, d, a)) continue
      const cost = damageCost[d] + armorCost[a]
      if (cost > best) {
         best = cost
         console.log(d, a, cost)
      }
   }
}
console.log(fight(100, 7, 3))
