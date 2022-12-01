import { getInput } from '../2021/base.mjs'

const input = await getInput(12, 2015)

function deepSum(obj) {
   if (typeof obj == 'number') return Number(obj)
   if (typeof obj == 'string') return 0
   if (!(obj instanceof Array)) {
      if (Object.values(obj).includes('red')) return 0
      obj = Object.values(obj)
   }
   if (obj instanceof Array) return obj.map(deepSum).reduce((a, b) => a + b)
}

console.log(deepSum(JSON.parse(input)))
