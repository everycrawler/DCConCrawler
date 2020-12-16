const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

async function downloadDCCon (packageDetail, downloadFolder) {
  let paths = []

  packageDetail.detail.forEach(elem => {
    paths.push(elem.path)
  })

  paths = new Set(paths)

  let i = 0

  paths.forEach(async (elem) => {
    const file = await fetch(`https://dcimg5.dcinside.com/dccon.php?no=${elem}`, {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    const buff = await file.buffer()
    
    fs.writeFileSync(path.join(downloadFolder, `${i}.png`), buff, () => {
      console.log(elem + 'finish')
    })

    i = i + 1
  })
}

module.exports = downloadDCCon
