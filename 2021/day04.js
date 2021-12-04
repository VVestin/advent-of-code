const input = require('./base')(4)
   .split('\n\n')

chosen = input[0].split(',').map(Number)
boards = input.slice(1).map(
   board => board.split('\n').join(' ').split(' ').filter(x => x).map(n => ({val: Number(n), marked: false}))
)

const isWinner = (board, i) => {
   let vert = true
   for (let j = i - i % 5; j < i + (5 - i % 5); j++)
      if (!board[j].marked)
         vert = false
   let horiz = true
   for (let j = i % 5; j < 25; j += 5)
      if (!board[j].marked)
         horiz = false
   return vert || horiz
}

outer: for (let num of chosen) {
   console.log('chose', num, boards.length)
   let winnerIndexes = []
   for (let board of boards) {
      for (let [i, n] of board.entries()) {
         if (n.val == num)
            n.marked = true
         else continue
         if (isWinner(board, i)) {
            console.log('winner', board, i)
            winnerIndexes.unshift(boards.indexOf(board))
            if (boards.length == 1) {
               console.log(board.filter(x => !x.marked).reduce((acc, x) => acc + x.val, 0) * num)
               break outer
            }
         }
      }
   }
   winnerIndexes.forEach(index => boards.splice(index, 1))
}
