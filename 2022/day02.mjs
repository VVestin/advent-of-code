import { getInput } from '../2021/base.mjs'

const input = (await getInput(2, 2022)).split('\n').map(line => line.split(' '))

const toPoints = { X: 0, Y: 3, Z: 6 }
const toThrow = {
   X: { A: 3, B: 1, C: 2 }, //LOSE
   Y: { A: 1, B: 2, C: 3 }, // DRAW
   Z: { A: 2, B: 3, C: 1 }, // WIN
}
let total = 0
input.forEach(([elf, you]) => {
   total += toPoints[you] + toThrow[you][elf]
})
console.log(total)
