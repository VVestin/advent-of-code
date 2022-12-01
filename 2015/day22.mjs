import { getInput } from '../2021/base.mjs'

const input = (await getInput(22, 2015))
   .trim()
   .split('\n')
   .map(line => Number(line.split(': ')[1]))

function applyEffects(player, boss) {
   if (player.sheildTurns) {
      player.armor = 7
      player.sheildTurns--
   } else player.armor = 0
   if (player.poisonTurns) {
      boss.hp -= 3
      player.poisonTurns--
   }
   if (player.rechargeTurns) {
      player.mana += 101
      player.rechargeTurns--
   }
}

function playerTurn(player, boss, manaAllowed, history) {
   //console.log('player turn', player, boss, manaAllowed, history)
   player.hp -= 1
   if (player.hp <= 0) return false
   applyEffects(player, boss)
   if (boss.hp <= 0) return history
   const { hp, mana, sheildTurns, poisonTurns, rechargeTurns } = player
   return (
      (mana >= 53 && // magic missile
         manaAllowed >= 53 &&
         bossTurn(
            { ...player, mana: mana - 53 },
            { ...boss, hp: boss.hp - 4 },
            manaAllowed - 53,
            [...history, 'magic missile']
         )) ||
      (mana >= 73 && // drain
         manaAllowed >= 73 &&
         bossTurn(
            { ...player, hp: hp + 2, mana: mana - 73 },
            { ...boss, hp: boss.hp - 2 },
            manaAllowed - 73,
            [...history, 'drain']
         )) ||
      (mana >= 113 && // sheild
         manaAllowed >= 113 &&
         sheildTurns == 0 &&
         bossTurn(
            { ...player, sheildTurns: 6, mana: mana - 113 },
            { ...boss },
            manaAllowed - 113,
            [...history, 'sheild']
         )) ||
      (mana >= 173 && // poison
         manaAllowed >= 173 &&
         poisonTurns == 0 &&
         bossTurn(
            { ...player, poisonTurns: 6, mana: mana - 173 },
            { ...boss },
            manaAllowed - 173,
            [...history, 'poison']
         )) ||
      (mana >= 229 && // recharge
         manaAllowed >= 229 &&
         rechargeTurns == 0 &&
         bossTurn(
            { ...player, rechargeTurns: 5, mana: mana - 229 },
            { ...boss },
            manaAllowed - 229,
            [...history, 'recharge']
         ))
   )
}

function bossTurn(player, boss, manaAllowed, history) {
   //console.log('boss turn', player, boss, manaAllowed, history)
   applyEffects(player, boss)
   if (boss.hp <= 0) return history
   player.hp -= Math.max(1, boss.damage - player.armor)
   if (player.hp <= 0) return false
   return playerTurn(player, boss, manaAllowed, history)
}

for (let v = 900; v < 1900; v++) {
   console.log(
      v,
      playerTurn(
         {
            hp: 50,
            armor: 0,
            mana: 500,
            sheildTurns: 0,
            poisonTurns: 0,
            rechargeTurns: 0,
         },
         { hp: input[0], damage: input[1] },
         v,
         []
      )
   )
}
