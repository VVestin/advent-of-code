import { getInput } from '../2021/base.mjs'
import md5 from 'md5'

const input = await getInput(4, 2015)

for (let i = 0; i < 10_000_000; i++) {
   const hash = md5(input + i)
   if (hash.startsWith('000000')) {
      console.log(i)
      break
   }
}
