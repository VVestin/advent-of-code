import { getInput } from '../2021/base.mjs'

const input = await getInput(13, 2015).split('\n')

const happiness = {}

input.forEach(line => {
   line = line.split(' ')
   const a = line[0]
   const b = line.at(-1).slice(0, -1)
   const change = (line[2] == 'gain' ? 1 : -1) * Number(line[3])
   happiness[a] = { ...happiness[a], [b]: change }
})

function totalHappiness(table) {
   let sum = 0
   for (let i = 1; i < table.length; i++) {
      sum +=
         happiness[table[i]][table[i - 1]] + happiness[table[i - 1]][table[i]]
   }
   return sum
}

function allTables(people) {
   if (people.length == 1) return [people]
   const tables = []
   for (let i = 0; i < people.length; i++) {
      const subTables = allTables(people.slice(1))
      for (let subTable of subTables) subTable.splice(i, 0, people[0])
      tables.push(...subTables)
   }
   return tables
}

console.log(Math.max(...allTables(Object.keys(happiness)).map(totalHappiness)))
