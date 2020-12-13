let x = 0,
   y = 0,
   wx = 10,
   wy = 1
process.argv[2]
   .trim()
   .split('\n')
   .forEach(instr => {
      const code = instr[0]
      const amt = Number(instr.slice(1))
      console.log(code, amt)
      if (code == 'N') wy += amt
      if (code == 'E') wx += amt
      if (code == 'S') wy -= amt
      if (code == 'W') wx -= amt
      if (code == 'R') for (let i = 0; i < amt / 90; i++) [wx, wy] = [wy, -wx]
      if (code == 'L') for (let i = 0; i < amt / 90; i++) [wx, wy] = [-wy, wx]
      if (code == 'F') [x, y] = [x + amt * wx, y + amt * wy]
      console.log(x, y, wx, wy)
   })
console.log(x, y, Math.abs(x) + Math.abs(y))
