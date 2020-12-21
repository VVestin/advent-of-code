const allAllergens = new Set()
const allIngredients = new Set()

const foods = process.argv[2]
   .split('\n')
   .map(line => line.split('('))
   .map(([ingredients, allergens]) => [
      ingredients.trim().split(' '),
      allergens.slice(9, -1).split(', '),
   ])

foods.forEach(([ingredients, allergens]) => {
   allergens.forEach(a => allAllergens.add(a))
   ingredients.forEach(i => allIngredients.add(i))
})
//console.log(allAllergens, allAllergens.size)
//console.log(allIngredients, allIngredients.size)

const aPoss = new Map()
foods.forEach(([ingredients, allergens]) => {
   allergens.forEach(allergen => {
      if (!aPoss.has(allergen)) aPoss.set(allergen, ingredients)
      else
         aPoss.set(
            allergen,
            aPoss.get(allergen).filter(i => ingredients.includes(i))
         )
   })
})

const used = new Set()
for (const ingredients of aPoss.values()) ingredients.forEach(i => used.add(i))

const mappings = []
for (let i = 0; i < 4; i++)
   aPoss.forEach((ingredients, allergen) => {
      if (ingredients.length == 1) {
         aPoss.delete(allergen)
         mappings.push([allergen, ingredients[0]])
         aPoss.forEach((_, allergen) =>
            aPoss.set(
               allergen,
               aPoss.get(allergen).filter(i => i != ingredients[0])
            )
         )
      }
   })

mappings.sort()

console.log(
   aPoss,
   mappings,
   used,
   foods.reduce(
      (a, [ingredients]) =>
         a + ingredients.reduce((b, i) => (used.has(i) ? b : b + 1), 0),
      0
   ),
   mappings.map(m => m[1]).join(',')
)
