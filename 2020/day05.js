const parseBinary = (s, one) =>
   s.split('').reduce((n, c) => 2 * n + (c == one ? 1 : 0), 0)

let ids = process.argv[2]
   .trim()
   .split('\n')
   .map(line => [
      parseBinary(line.slice(0, 7), 'B'),
      parseBinary(line.slice(7), 'R'),
   ])
   .map(([r, c]) => r * 8 + c)

ids.sort((x, y) => x - y)

for (let i = 1; i < ids.length; i++) {
   if (ids[i - 1] + 2 == ids[i]) console.log('woop', ids[i] - 1)
}
