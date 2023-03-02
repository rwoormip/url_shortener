const express = require('express')

require('./config/mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})