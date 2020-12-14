function xgcd(a, b) {
   if (b == 0) {
      return [1, 0, a]
   }
   const [x, y, d] = xgcd(b, a % b)
   return [y, x - y * Math.floor(a / b), d]
}

const busses = process.argv[2]
   .trim()
   .split('\n')[1]
   .split(',')
   .map((bus, i) => [bus, i])
   .filter(([bus, _]) => bus != 'x')
   .map(([bus, o]) => {
      const m = Number(bus)
      const a = (((m - o) % m) + m) % m
      return `x = ${a} mod ${m}`
   })

console.log(busses)
