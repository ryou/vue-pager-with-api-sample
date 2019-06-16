const _ = require('lodash')
const express = require('express')
const server = express()
const cors = require('cors')

server.use(cors())

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const items = require('./data/items')
const categories = require('./data/categories')
const itemsWithCategoryData = items.map(item => {
  item.item_category = categories.find(
    category => category.category_id === item.item_category_id
  )
  return item
})

server.get('/', (req, res) => {
  res.send('hello')
})

server.get('/api/item/list', async (req, res) => {
  const { keyword, category_id, count, page } = req.query

  let tmp = itemsWithCategoryData
  if (keyword !== undefined) {
    tmp = tmp.filter(item => item.item_name.includes(keyword))
  }
  if (category_id !== undefined && category_id !== '') {
    tmp = tmp.filter(
      item => item.item_category.category_id === Number(category_id)
    )
  }

  let localCount = 5
  if (count !== undefined) {
    localCount = count
  }
  const splitItems = _.chunk(tmp, localCount)

  let localPage = 0
  if (page !== undefined) {
    localPage = page
  }
  const result = splitItems[localPage]

  await sleep(1000)

  res.json({
    current_page: Number(localPage),
    last_page: splitItems.length - 1,
    items: result,
  })
})

server.get('/api/item/:id', async (req, res) => {
  const id = Number(req.params.id)
  const result = itemsWithCategoryData.find(item => item.item_id === id)

  await sleep(1000)

  res.json(result)
})

server.listen(8880, () => {
  console.log('Lostening on port 8880')
})
