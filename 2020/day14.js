const allMasks = mask => {
   const idx = mask.indexOf('X')
   if (idx == -1) return [mask]

   const subMasks = allMasks(mask.slice(idx + 1))
   return [
      ...subMasks.map(m => mask.slice(0, idx) + '0' + m),
      ...subMasks.map(m => mask.slice(0, idx) + '1' + m),
   ]
}

const applyMask = (mask, value) => {
   mask
      .split('')
      .reverse()
      .forEach((c, i) => {
         if (c == '1') value |= 1n << BigInt(i)
         if (c == '0') value &= ~(1n << BigInt(i))
      })
   return value
}

const memory = {}
let masks
process.argv[2]
   .trim()
   .split('\n')
   .forEach(line => {
      const lhs = line.split('=')[0].trim()
      const value = line.split('=')[1].trim()
      if (lhs == 'mask') masks = allMasks(value.replace(/0/g, 'x'))
      else {
         const addr = BigInt(lhs.slice(4, -1))
         masks.forEach(mask => {
            const maskedAddr = applyMask(mask, addr)
            memory[maskedAddr] = BigInt(value)
         })
      }
   })

console.log(Object.values(memory).reduce((a, b) => a + b, 0n))
