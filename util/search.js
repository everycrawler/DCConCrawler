const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

async function search (_keyword) {
  const params = new URLSearchParams()

  params.append('type', 'title')
  params.append('keyword', _keyword)
  params.append('page', '1')

  const searchData = await fetch('https://gall.dcinside.com/dccon/search', {
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: params
  })

  return searchData
}

module.exports = search
