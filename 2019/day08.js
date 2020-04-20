const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   data = data.trim().split('')
   let w = 25;
   let h = 6;
   let imgs = []
   for (let i = 0; i < data.length; i += w * h)
      imgs.push(data.slice(i, i + w * h))
   imgs = imgs.map(flatImg => {
      let img = []
      for (let i = 0; i < h; i++) 
         img.push(flatImg.slice(i * w, i * w + w))
      return img
   })
   let finalImage = new Array(h).fill(null).map(e => new Array(w).fill(0))
   for (let i = imgs.length - 1; i >= 0; i--) {
      let img = imgs[i]
      console.log(i, img)
      for (let r = 0; r < img.length; r++)
         for (let c = 0; c < img[r].length; c++)
            if (img[r][c] != 2)
               finalImage[r][c] = img[r][c]
   }
   console.log(finalImage.map(row => row.map(e => ' #'[e]).join('')).join('\n'))
})
