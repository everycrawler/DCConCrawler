const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

async function getPackageDetail (code) {
  const params = new URLSearchParams()

  params.append('code', code)

  const searchData = await fetch('https://gall.dcinside.com/dccon/package_detail', {
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: params
  })

  return searchData
}

module.exports = getPackageDetail
