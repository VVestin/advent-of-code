const fs = require('fs')

function opDir(dir) {
   return dir % 2 == 1 ? dir + 1 : dir - 1
}

function moveDir(pos, dir) {
   let nextPos = {...pos}

   if (dir == 1)
      nextPos.x -= 1
   if (dir == 2)
      nextPos.x += 1
   if (dir == 3)
      nextPos.y -= 1
   if (dir == 4)
      nextPos.y += 1

   return nextPos
}

class IntComputer {
   constructor(code, input) {
      this.code = code
      this.input = input
      this.pc = 0
      this.output = []
   }

   hasHalted() {
      return !this.code[this.pc] || this.code[this.pc] == 99
   }

   run() {
      while (!this.hasHalted()) {
         let instr = this.code[this.pc]
         let opcode = '0000' + String(instr)
         opcode = opcode.substr(0, opcode.length - 2)
         //console.log('executing ', this.pc, instr)
         switch (instr % 100) {
            case 1:
            case 2:
            case 7:
            case 8: {
               let arg1 = opcode[opcode.length - 1] == 1 ? 
                  this.code[this.pc + 1] : this.code[this.code[this.pc + 1]]
               let arg2 = opcode[opcode.length - 2] == 1 ? 
                  this.code[this.pc + 2] : this.code[this.code[this.pc + 2]]
               let dest = this.code[this.pc + 3]

               //console.log('code[', dest, '] =', arg1, ' +*'[instr % 100], arg2)
               if (instr % 100 == 1)
                  this.code[dest] = arg1 + arg2
               else if (instr % 100 == 2)
                  this.code[dest] = arg1 * arg2
               else if (instr % 100 == 7)
                  this.code[dest] = arg1 < arg2 ? 1 : 0
               else if (instr % 100 == 8)
                  this.code[dest] = arg1 == arg2 ? 1 : 0
               this.pc += 4
               break
            }
            case 3:
               if (this.input.length == 0)
                  return
               this.code[this.code[this.pc + 1]] = this.input.pop()
               this.pc += 2
               break
            case 4:
               this.output.unshift(this.code[this.code[this.pc + 1]])
               this.pc += 2
               break
            case 5:
            case 6: {
               let arg = opcode[opcode.length - 1] == 1 ? 
                  this.code[this.pc + 1] : this.code[this.code[this.pc + 1]]
              
               if (instr % 100 == 5 && !arg || instr % 100 == 6 && arg) {
                  //console.log('branch not taken', arg)
                  this.pc += 3
                  break
               }
               //console.log('branch taken', arg)
               this.pc = opcode[opcode.length - 2] == 1 ? 
                  this.code[this.pc + 2] : this.code[this.code[this.pc + 2]]
               break
            }
            default:
               console.error('Error unknown instruction', instr)
               this.pc = null
               return
         }
      }
   }
}

function perms(arr) {
   if (arr.length <= 1)
      return [arr]
   let ps = []
   for (let i = 0; i < arr.length; i++) {
      let sub = [...arr]
      sub.splice(i, 1)
      perms(sub).forEach((a) => {
         a.unshift(arr[i])
         ps.push(a)
      })
   }
   return ps
}

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   let code = data.trim().split(',').map(s => s.trim()).map(s => parseInt(s))
   let comp = new IntComputer(code, [])
   let pos = {x: 30, y: 40}
   let grid = new Array(180).fill(null).map(_ => new Array(100).fill(0))
   grid[pos.y][pos.x] = 1

   let oxPos = {x: 32, y: 55}
   let traveled = [{dir: -1, options: [1, 2, 3, 4]}]
   search: for (let step = 0; step < 2780; step++) {
      while (traveled[0].options.length == 0) {
         let backDir = opDir(traveled[0].dir)
         comp.input.push(backDir)
         comp.run()
         comp.output.pop()
         grid[pos.y][pos.x] = -1
         pos = moveDir(pos, backDir)
         traveled.shift()
         if (traveled.length == 0) {
            break search
         }
      }
      let dir = traveled[0].options.shift()
      let nextPos = moveDir(pos, dir)

      comp.input.push(dir)
      comp.run()
      let status = comp.output.pop()

      if (status == 0) {
         if (grid[nextPos.y][nextPos.x] != 0 && grid[nextPos.y][nextPos.x] != 3) {
            console.log(traveled.length, traveled[0])
            console.log('pos', pos)
            console.log('nextPos', nextPos)
            console.log('step', step)
            console.log('bad')
            break
         }
         grid[nextPos.y][nextPos.x] = 3
      } else if (status == 1 || status == 2) {
         if (status == 2)
            oxPos = nextPos
         grid[nextPos.y][nextPos.x] = status
         pos = nextPos
         traveled.unshift({
            dir, 
            options: [1, 2, 3, 4]
               .filter(d => {
                  let p = moveDir(pos, d)
                  return grid[p.y][p.x] == 0
               })
         })
      }

      console.log(traveled.length, traveled[0])
   }

   console.log(oxPos)

   grid[oxPos.y][oxPos.x] = 5

   let change = true
   for (let step = 0; step < 367; step++) {
      let g = grid.map(line => [...line])
      change = false
      for (let y = 1; y < grid.length - 1; y++) {
         for (let x = 1; x < grid.length; x++) {
            if (grid[y][x] == -1 && (
                grid[y-1][x] == 5
             || grid[y+1][x] == 5
             || grid[y][x+1] == 5
               || grid[y][x-1] == 5)) {

               g[y][x] = 5
               change = true
            }
         }
      }
      grid = g
      console.log(step, change)
   }

   let dispGrid = grid.map((line, y) => line.map((v, x) => 
      y == pos.y && x == pos.x ? 4 : v))
   console.log(dispGrid.slice(5, 60).map(line => line.map(t => '~ .*#DO'[t + 1]).join('').substr(0, 65)).join('|\n'))

})
