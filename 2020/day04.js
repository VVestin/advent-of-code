const fs = require('fs')

const fieldValid = ([field, value]) => {
   switch (field) {
      case 'byr':
         return value >= 1920 && value <= 2002
         break
      case 'iyr':
         return value >= 2010 && value <= 2020
         break
      case 'eyr':
         return value >= 2020 && value <= 2030
         break
      case 'hgt':
         switch (value.slice(-2)) {
            case 'cm':
               return value.slice(0, -2) >= 150 && value.slice(0, -2) <= 193
               break
            case 'in':
               return value.slice(0, -2) >= 59 && value.slice(0, -2) <= 76
               break
            default:
               return false
         }
      case 'hcl':
         return !!value.match(/^#[0-9a-f]{6}$/)
         break
      case 'ecl':
         return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
            value
         )
         break
      case 'pid':
         return !!value.match(/^[0-9]{9}$/)
         break
      case 'cid':
         return true
      default:
         return false
   }
}

let valid = process.argv[2]
   .trim()
   .split('\n\n')
   .map(line => line.split(/[\ \n]/).map(pair => pair.split(':')))
   .filter(
      pairs =>
         pairs.filter(pair => pair[0] != 'cid').length == 7 &&
         pairs.every(fieldValid)
   )
console.log(valid, valid.length)
