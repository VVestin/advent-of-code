let groups = process.argv[2]
   .trim()
   .split('\n\n')
   .map(lines => lines.split('\n').map(line => line.split('')))
   .map(lines =>
      lines.reduce(
         (set, line) =>
            line.reduce((a, l) => (set.has(l) ? a.add(l) : a), new Set()),
         new Set('abcdefghijklmnopqrstuvwxyz'.split(''))
      )
   )
   .reduce((a, set) => a + set.size, 0)

console.log(groups)
