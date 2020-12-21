const tiles = new Map()

const rotate = tile => {
   tile.touches.unshift(tile.touches.pop())
   tile.image = tile.image.map((row, r) =>
      row
         .split('')
         .map((_, c) => tile.image[9 - c][r])
         .join('')
   )
}

const flipVert = tile => {
   ;[tile.touches[0], tile.touches[2]] = [tile.touches[2], tile.touches[0]]
   tile.image = tile.image.map((_, r) => tile.image[9 - r])
}
const flipHoriz = tile => {
   ;[tile.touches[1], tile.touches[3]] = [tile.touches[3], tile.touches[1]]
   tile.image = tile.image.map(row => row.split('').reverse().join(''))
}

process.argv[2]
   .split('\n\n')
   .map(tile => tile.split(':'))
   .map(([name, tile]) => [Number(name.split(' ')[1]), tile.trim().split('\n')])
   .forEach(([id, tile]) =>
      tiles.set(id, {
         sides: [
            tile[0],
            tile.map(line => line[9]).join(''),
            tile[9],
            tile.map(line => line[0]).join(''),
         ],
         image: tile,
         id: id,
      })
   )

tiles.forEach((tile, id) => {
   tile.touches = [0, 0, 0, 0]
   tile.sides.forEach((side, i) =>
      tiles.forEach((other, otherId) =>
         other.sides.forEach(otherSide => {
            if (
               otherId != id &&
               (otherSide == side ||
                  otherSide == side.split('').reverse().join(''))
            )
               tile.touches[i] = otherId
         })
      )
   )
})

tiles.forEach(tile => delete tile.sides)
//tiles.forEach(tile => rotate(tile))

const picture = new Array(Math.sqrt(tiles.size))
   .fill(0)
   .map(_ => new Array(Math.sqrt(tiles.size)).fill(0))

picture[0][0] = [...tiles.values()].filter(
   ({ touches }) => touches.filter(id => id != 0).length == 2
)[0]

while (picture[0][0].touches[0] != 0 || picture[0][0].touches[3] != 0)
   rotate(picture[0][0])
console.log('top-left', picture[0][0])

for (let i = 1; i < picture[0].length; i++) {
   const left = picture[0][i - 1]
   const tile = tiles.get(left.touches[1])
   picture[0][i] = tile
   while (tile.touches[3] != left.id) rotate(tile)
   if (tile.touches[0] != 0) flipVert(tile)
}

for (let i = 1; i < picture.length; i++) {
   for (let j = 0; j < picture[i].length; j++) {
      const above = picture[i - 1][j]
      const tile = tiles.get(above.touches[2])
      picture[i][j] = tile
      while (tile.touches[0] != above.id) rotate(tile)
      if (j == 0 && tile.touches[3] != 0) flipHoriz(tile)
      if (j != 0 && tile.touches[3] != picture[i][j - 1].id) flipHoriz(tile)
   }
}

console.log(picture.map(row => row.map(tile => tile.id)).join('\n'))

tiles.forEach(
   tile => (tile.image = tile.image.slice(1, -1).map(line => line.slice(1, -1)))
)
let image = new Array(picture.length * 8)
   .fill(0)
   .map((_, i) =>
      picture[Math.floor(i / 8)].reduce(
         (acc, tile) => acc + tile.image[i % 8],
         ''
      )
   )

const monster = [
   '                  # ',
   '#    ##    ##    ###',
   ' #  #  #  #  #  #   ',
]

const monsterSearch = (yTransform, xTransform) => {
   let monsterCount = 0
   for (let y = 0; y < image.length - monster.length; y++)
      search: for (let x = 0; x < image[0].length - monster[0].length; x++) {
         for (let i = 0; i < monster.length; i++)
            for (let j = 0; j < monster[0].length; j++)
               if (
                  monster[yTransform(i)][xTransform(j)] == '#' &&
                  image[y + i][x + j] == '.'
               )
                  continue search
         console.log('Drawing monster', x, y)
         for (let i = 0; i < monster.length; i++)
            for (let j = 0; j < monster[0].length; j++)
               if (monster[yTransform(i)][xTransform(j)] == '#') {
                  let row = image[y + i].split('')
                  row[x + j] = 'O'
                  image[y + i] = row.join('')
               }
         monsterCount++
      }
   return monsterCount
}

image = image.map((row, r) =>
   row
      .split('')
      .map((_, c) => image[image.length - 1 - c][r])
      .join('')
)
image = image.map((_, r) => image[image.length - 1 - r])

console.log(
   monsterSearch(
      y => y,
      x => x
   ),
   monsterSearch(
      y => y,
      x => monster[0].length - 1 - x
   ),
   monsterSearch(
      y => monster.length - 1 - y,
      x => x
   ),
   monsterSearch(
      y => monster.length - 1 - y,
      x => monster[0].length - 1 - x
   )
)
console.log(image.join('\n'))

console.log(
   image
      .join('')
      .split('')
      .filter(s => s == '#').length
)
