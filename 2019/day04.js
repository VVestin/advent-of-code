let rangeStart = 357253
let rangeEnd = 892942

let count = 0
num_search:
for (let n = rangeStart; n <= rangeEnd; n++) {
   let s = String(n)
   s += 'a'
   let adjacent = 0
   let valid = false
   for (let i = 1; i < s.length; i++) {
      if (s[i-1] > s[i])
         continue num_search
      if (s[i-1] == s[i])
         adjacent++
      if (s[i-1] != s[i]) {
         if (adjacent == 1)
            valid = true
         adjacent = 0
      }
   }
   console.log(n, valid)
   count += valid
}

console.log(count);
