const linkedString = head => {
   let s = ''
   for (let e = head; e; e = e.next) {
      s += e.val + ','
   }
   return s
}

const linkedFind = (head, searchVal) => {
   for (let e = head; e; e = e.next) {
      if (e.val == searchVal) return e
   }
}

let head, tail
let last
process.argv[2]
   .split('')
   .map(c => Number(c))
   .forEach((v, i) => {
      const e = { val: v, next: null }
      if (i == 0) head = e
      if (i == 8) tail = e
      if (last) last.next = e
      last = e
   })
console.log(linkedString(head), tail)
const N = 1_000_000
for (let i = 10; i <= N; i++) {
   tail.next = { val: i, next: null }
   tail = tail.next
}

const valIndex = new Map()
for (let e = head; e; e = e.next) valIndex.set(e.val, e)
const move = cups => {
   const current = head
   head = head.next
   current.next = null

   const pickup = head
   head = head.next.next.next
   pickup.next.next.next = null

   let i
   for (
      i = (current.val - 1 + N - 1) % N;
      linkedFind(pickup, i + 1);
      i = (i + N - 1) % N
   );
   i++

   const dest = valIndex.get(i)
   /*console.log(
      linkedString(current),
      linkedString(pickup),
      linkedString(head),
      dest.val
   )*/
   const oldNext = dest.next
   dest.next = pickup
   pickup.next.next.next = oldNext

   if (dest != tail) {
      tail.next = current
   } else {
      pickup.next.next.next = current
   }
   tail = current
}

for (let i = 0; i < 10_000_000; i++) {
   if (i % 1_000_000 == 0) console.log(i)
   move(head)
}
//console.log(linkedString(head))
let e = valIndex.get(1)
console.log(e.val, e.next.val * e.next.next.val)
