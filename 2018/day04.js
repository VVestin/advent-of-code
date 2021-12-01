const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
   data = data.trim().split('\n')
   data.forEach(line => {
      const { date, hour, minute, event } = line.match(
         /\[(?<date>\S+) (?<hour>\d\d):(?<minute>\d\d)\] (?<event>.*)/
      ).groups
      console.log(date, hour, minute, event)
   })
})
