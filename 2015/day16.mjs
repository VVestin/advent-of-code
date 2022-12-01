import { getInput } from '../2021/base.mjs'

const input = (await getInput(16, 2015)).split('\n')

const exactAttrs = {
   children: 3,
   samoyeds: 2,
   akitas: 0,
   vizslas: 0,
   cars: 2,
   perfumes: 1,
}

const gtAttrs = {
   cats: 7,
   trees: 3,
}

const ltAttrs = {
   pomeranians: 3,
   goldfish: 5,
}

input.forEach(line => {
   const firstColon = line.indexOf(':')
   const id = Number(line.slice(line.indexOf(' '), firstColon))
   const attrs = line
      .slice(firstColon + 2)
      .split(', ')
      .map(a => a.split(': '))
      .map(a => [a[0], Number(a[1])])

   let match = true
   for (let [attr, amt] of attrs) {
      if (attr in exactAttrs && amt != exactAttrs[attr]) match = false
      if (attr in gtAttrs && amt <= gtAttrs[attr]) match = false
      if (attr in ltAttrs && amt >= ltAttrs[attr]) match = false
   }
   if (match) console.log(id)
})
