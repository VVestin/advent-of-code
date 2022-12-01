import { getInput } from '../2021/base.mjs'

const input = await getInput(25, 2015)

const START = 20151125
const MULT = 252533
const MOD = 33554393

const next = num => (num * MULT) % MOD

const pattern = /.*row (\d+), column (\d+)/

const [row, col] = pattern.exec(input).slice(1, 3).map(Number)

const sum = row + col
const n = ((sum - 1) * (sum - 2)) / 2 + col
console.log(row, col, n)
let x = START
for (let i = 1; i < n; i++) x = next(x)
console.log(x)
