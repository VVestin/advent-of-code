import { getInput } from './base.mjs'
let [algorithm, img] = (await getInput(20)).split('\n\n')

const strToDigits = s => s.split('').map(c => (c == '#' ? 1 : 0))
algorithm = strToDigits(algorithm)
img = img.split('\n').map(strToDigits)

let a = 100
let b = 100
for (let i = 0; i < a; i++) {
   img = img.map(line => [0, ...line, 0])
   img.push(new Array(img[0].length).fill(0))
   img.unshift(new Array(img[0].length).fill(0))
}

const neighborhood = []
for (let i of [-1, 0, 1]) for (let j of [-1, 0, 1]) neighborhood.push([i, j])

function enhance(img) {
   const outImg = new Array(img.length + 2)
      .fill(0)
      .map(_ => new Array(img[0].length + 2).fill(null))
   for (let i = 0; i < outImg.length; i++) {
      for (let j = 0; j < outImg[0].length; j++) {
         let binString = ''
         for (let offset of neighborhood) {
            binString += img[i - 1 + offset[0]]?.[j - 1 + offset[1]] || '0'
         }
         outImg[i][j] = algorithm[parseInt(binString, 2)]
      }
   }
   return outImg
}
for (let i = 0; i < 50; i++) {
   //console.log(i)
   img = enhance(img)
}
//console.log(img.map(line => line.map(x => '.#'[x]).join('')).join('\n'))
let count = 0
for (let i = b; i < img.length - b; i++)
   for (let j = b; j < img[0].length - b; j++) count += img[i][j]
console.log(count)
