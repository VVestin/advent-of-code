import { getInput } from './base.mjs'
import { FibonacciHeap } from '@tyriar/fibonacci-heap'

const input = (await getInput(23))
   .trim()
   .split('\n')
   .map(line => line.split(''))
input.splice(3, 0, '  #D#C#B#A#'.split(''), '  #D#B#A#C#'.split(''))

const ENERGY_COST = { A: 1, B: 10, C: 100, D: 1000 }
const TARGET_COL = { A: 3, B: 5, C: 7, D: 9 }
const TEMP_SLOTS = [1, 2, 4, 6, 8, 10, 11]

const between = (col, start, end) => {
   if (start > end) return between(col, end, start)
   return start < col && col < end
}

const moveable = (diagram, start, end) => {
   if (start > end) return moveable(diagram, end, start)
   return TEMP_SLOTS.every(
      col => !(start < col && col < end) || diagram[1][col] == '.'
   )
}

const cleanCol = (diagram, col) => {
   for (let i = diagram.length - 2; i >= 2; i--) {
      const c = diagram[i][col]
      if ('ABCD'.includes(c) && TARGET_COL[c] != col) return false
   }
   return true
}

const deadlocked = diagram => {
   const forcedMoves = []
   for (let j of TEMP_SLOTS) {
      const c = diagram[1][j]
      if (!'ABCD'.includes(c)) continue
      for (let [start, end] of forcedMoves) {
         if (between(j, start, end) && between(start, j, TARGET_COL[c]))
            return true
      }
      forcedMoves.push([j, TARGET_COL[c]])
   }
   for (let j of Object.values(TARGET_COL)) {
      const c1 = diagram[1][j - 1]
      const c2 = diagram[1][j + 1]
      if (c1 == '.' || c2 == '.') continue
      if (TARGET_COL[c1] < j || TARGET_COL[c2] > j) continue
      if (cleanCol(diagram, j)) continue
      return true
   }
   return false
}

const getMoves = diagram => {
   const moves = []
   for (let j of TEMP_SLOTS) {
      const c = diagram[1][j]
      if (!'ABCD'.includes(c)) continue
      const tc = TARGET_COL[c]
      if (!moveable(diagram, j, tc)) continue
      if (!cleanCol(diagram, tc)) continue
      for (let i = 2; i < diagram.length; i++) {
         if (diagram[i][tc] != '.') {
            moves.push({ from: [1, j], to: [i - 1, tc] })
            break
         }
      }
   }
   for (let j of Object.values(TARGET_COL)) {
      if (cleanCol(diagram, j)) continue
      for (let i = 2; i < diagram.length - 1; i++) {
         const c = diagram[i][j]
         if ('ABCD'.includes(c)) {
            for (let tc of TEMP_SLOTS)
               if (diagram[1][tc] == '.' && moveable(diagram, j, tc))
                  moves.push({ from: [i, j], to: [1, tc] })
            break
         }
      }
   }
   return moves
}

const getNeighbors = ({ diagram, g }) => {
   const neighbors = []
   for (let { from, to } of getMoves(diagram)) {
      const newDiagram = diagram.map(line => [...line])
      newDiagram[to[0]][to[1]] = diagram[from[0]][from[1]]
      newDiagram[from[0]][from[1]] = '.'
      if (deadlocked(newDiagram)) continue
      const cost =
         ENERGY_COST[diagram[from[0]][from[1]]] *
         (Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]))
      neighbors.push({ diagram: newDiagram, g: g + cost, h: hCost(newDiagram) })
   }
   return neighbors
}

const hCost = diagram => {
   let h = 0
   const finishedCounts = { A: 0, B: 0, C: 0, D: 0 }
   for (let j of Object.values(TARGET_COL)) {
      let dirty = false
      for (let i = diagram.length - 2; i >= 2; i--) {
         const c = diagram[i][j]
         if ('ABCD'.includes(c)) {
            if (!dirty && TARGET_COL[c] == j) {
               finishedCounts[c]++
               continue
            }
            dirty = true
            let steps
            if (j == TARGET_COL[c]) steps = i + 2
            else steps = i + Math.abs(j - TARGET_COL[c])
            h += steps * ENERGY_COST[c]
         }
      }
   }
   for (let j of TEMP_SLOTS) {
      const c = diagram[1][j]
      if ('ABCD'.includes(c)) {
         h += ENERGY_COST[c] * (1 + Math.abs(j - TARGET_COL[c]))
      }
   }

   for (let [c, count] of Object.entries(finishedCounts)) {
      let triangle = x => (x * (x + 1)) / 2
      const uncountedSteps = triangle(diagram.length - 4 - count)
      h += ENERGY_COST[c] * uncountedSteps
   }
   return h
}

const stringy = diagram => diagram.map(line => line.join('')).join('\n')

const pretty = node => ({
   ...node,
   diagram: node.diagram.map(line => line.join('')),
   f: node.g + node.h,
})

const openSet = new FibonacciHeap()
const nodeLookup = {}

nodeLookup[stringy(input)] = openSet.insert(hCost(input), {
   diagram: input,
   g: 0,
   h: hCost(input),
})
while (!openSet.isEmpty()) {
   const current = openSet.extractMinimum().value
   if (current.h == 0) {
      console.log('FINISHED', pretty(current))
      break
   }
   //console.log('exploring ', pretty(current), openSet._nodeCount)
   for (let neighbor of getNeighbors(current)) {
      const s = stringy(neighbor.diagram)
      const existing = nodeLookup[s]
      if (!existing) {
         nodeLookup[s] = openSet.insert(neighbor.g + neighbor.h, neighbor)
      } else if (neighbor.g < existing.value.g) {
         existing.value.g = neighbor.g
         openSet.decreaseKey(existing, neighbor.g + neighbor.h)
      }
   }
}
