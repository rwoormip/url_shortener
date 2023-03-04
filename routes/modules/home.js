const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')
const generateShortURL = require('../../models/generate_shortURL')

router.get('/', (req, res) => {
  return res.render('index')
})

router.post('/', (req, res) => {
  const longURL = req.body.longURL

  // 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
  if (!longURL) return

  const shortURL = generateShortURL()

  // 輸入相同網址時，產生一樣的縮址
  URL.findOne({ longURL })
    .lean()
    .then(data => data ? data : URL.create({ shortURL, longURL }))
    .then(data => res.render('result', { shortURL: data.shortURL, longURL }))
    .catch(error => console.log(error))
})

router.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render('error', { errorURL: `${req.header('host')}/${shortURL}` })
      }

      res.redirect(data.longURL)
    })
    .catch(error => console.log(error))
})

module.exports = router