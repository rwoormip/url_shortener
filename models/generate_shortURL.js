function random(collection) {
  const index = Math.floor(Math.random() * collection.length)
  return collection[index]
}

function generateShortURL() {
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  let results = ''
  
  for (let i = 1; i <= 5; i++) {
    results += random(collection)
  }

  return results
}

module.exports = generateShortURL