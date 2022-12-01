import { getInput } from '../2021/base.mjs'

const input = (await getInput(19, 2015)).split('\n')

const molecule = tokenize(input.at(-1))
const rules = {}
input
   .slice(0, -1)
   .map(line => line.split(' => '))
   .filter(x => x[0])
   .forEach(([a, b]) => {
      if (!rules[a]) rules[a] = []
      rules[a].push(tokenize(b))
   })

function tokenize(s) {
   const tokens = []
   for (let i = 0; i < s.length; i++) {
      if (s[i].toUpperCase() == s[i]) tokens.push(s[i])
      else tokens[tokens.length - 1] += s[i]
   }
   return tokens
}

const canStart = {}
for (let lhs in rules) {
   canStart[lhs] = new Set()
   canStart[lhs].add(lhs)
   for (let rhs of rules[lhs]) canStart[lhs].add(rhs[0])
}

for (let i = 0; i < 10; i++) {
   for (let lhs in canStart) {
      for (let t1 of canStart[lhs]) {
         if (!canStart[t1]) continue
         for (let t2 of canStart[t1]) canStart[lhs].add(t2)
      }
   }
}
canStart['C'] = new Set(['C'])

const memo = {}
function steps(mol, target) {
   const [a, b] = [mol.join(''), target.join('')]
   if (!memo[a]) memo[a] = {}
   if (memo[a][b]) {
      return memo[a][b]
   }
   console.log(mol.length, target.length)
   if (mol.join('') == target.join('')) return (memo[a][b] = 0)
   /*if (mol.length >= target.length || !canStart[mol[0]].has(target[0]))
      return (memo[a][b] = Infinity)*/
   if (mol.length == 1) {
      if (!rules[mol[0]]) return (memo[a][b] = Infinity)
      return (memo[a][b] = Math.min(
         ...rules[mol[0]].map(newMol => 1 + steps(newMol, target))
      ))
   }
   //if (!canStart[mol[1]]) return (memo[a][b] = Infinity)
   let min = Infinity
   for (let i = 1; i < target.length; i++) {
      let s = steps(mol.slice(0, 1), target.slice(0, i))
      if (s == Infinity) continue
      s += steps(mol.slice(1), target.slice(i))
      if (s < min) min = s
   }
   return (memo[a][b] = min)
}

//console.log(rules)
//console.log(canStart)
console.log(steps(['e'], molecule))
