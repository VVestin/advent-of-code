const input = process.argv[2].split('\n\n')
const rules = {}
input[0]
   .split('\n')
   .map(line => line.split(':'))
   .forEach(
      ([head, body]) =>
         (rules[head] = body
            .split('|')
            .map(symbols => symbols.trim().split(' ')))
   )

rules['8'].push(['42', '8'])
rules['11'].push(['42', '11', '31'])

const match = (nonterminal, strings) => {
   return strings
      .map(string =>
         rules[nonterminal]
            .map(rule => {
               if (rule[0].startsWith('"'))
                  return string[0] == rule[0][1] && string.slice(1)
               return rule.reduce((s, nt) => s && match(nt, s), [string])
            })
            .filter(x => x !== false)
      )
      .flat(2)
}

console.log(
   input[1]
      .split('\n')
      .filter(string => match('0', [string + '$']).includes('$')).length
)

//console.log(rules)
