const fs = require('fs')

module.exports = (day) => {
   console.log('day', day)
   if (process.argv[2])
      return process.argv[2]
   const paddedDay = ('00' + day).slice(-2)
   return String(fs.readFileSync(`in/${paddedDay}.txt`)).trim()
}
