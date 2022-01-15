import fs from 'fs'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const mySession = process.env.AOC_SESSION

export function getInput(day) {
   console.log('day', day)
   if (process.argv[2]) return process.argv[2]
   const inFile = `in/${('00' + day).slice(-2)}.txt`
   if (fs.existsSync(inFile)) return String(fs.readFileSync(inFile)).trim()

   const url = `https://adventofcode.com/2021/day/${day}/input`
   console.log('downloading input from', url)
   if (!mySession) {
      console.error('Error: no session provided, cannot download your input')
      return ''
   }
   return fetch(url, { headers: { cookie: 'session=' + mySession } })
      .then(resp => {
         if (!resp.ok) {
            return resp.text().then(text => {
               console.log('error during fetch', text)
               throw new Error(resp.statusText)
            })
         }
         return resp.text()
      })
      .then(input => {
         console.log('download completed', input)
         return fs.promises.writeFile(inFile, input).then(_ => input)
      })
      .catch(err => {
         console.error(err)
         return ''
      })
}
