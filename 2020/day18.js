const PRECIDENCE = { '*': 1, '+': 1, '(': 0 }
console.log(
   process.argv[2]
      .trim()
      .split('\n')
      .map(line => '(' + line + ')')
      .map(line => line.replace(/\(/g, '( ').replace(/\)/g, ' )'))
      .map(line => line.split(' '))
      .map(tokens => {
         const opStack = []
         const valStack = []
         const popOp = () => {
            const popped = opStack.pop()
            if (popped == '+') valStack.push(valStack.pop() + valStack.pop())
            if (popped == '*') valStack.push(valStack.pop() * valStack.pop())
            return popped
         }
         tokens.forEach(token => {
            if (Number(token)) {
               valStack.push(Number(token))
            } else if (token == '+' || token == '*') {
               while (
                  PRECIDENCE[opStack[opStack.length - 1]] >= PRECIDENCE[token]
               )
                  popOp()
               opStack.push(token)
            } else if (token == '(') {
               opStack.push(token)
            } else if (token == ')') {
               while (popOp() != '(') {}
            }
            console.log(valStack, opStack)
         })
         return valStack[0]
      })
      .reduce((a, b) => a + b, 0)
)
