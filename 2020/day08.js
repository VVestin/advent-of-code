const interpret = (program, start = 0, sink = new Set()) => {
   let ip = start
   let acc = 0
   let visited = new Set()
   while (ip < program.length && !visited.has(ip) && !sink.has(ip)) {
      visited.add(ip)
      switch (program[ip].oper) {
         case 'jmp':
            ip += program[ip].val
            break
         case 'acc':
            acc += program[ip].val
         case 'nop':
            ip++
            break
      }
      //console.log('ip', ip)
   }
   if (sink.has(ip) || ip >= program.length) {
      sink.add(ip)
      for (const i of visited) sink.add(i)
   }
   console.log('acc', acc)
   return visited
}

const program = process.argv[2]
   .split('\n')
   .map(line => line.split(' '))
   .map(([oper, val]) => ({ oper, val: Number(val) }))

program[321].oper = 'nop'

const source = interpret(program)
/*const sink = new Set()
for (let i = 0; i < program.length; i++) {
   if (!sink.has(i)) interpret(program, i, sink)
}

const source = interpret(program)

for (const i of source)
   if (program[i].oper == 'nop')
      console.log(i, i + program[i].val, sink.has(program[i].val))

for (const i of source)
   if (program[i].oper == 'jmp') console.log(i, i + 1, sink.has(i + 1))
//console.log(source, sink)*/
