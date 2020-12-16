const readline = require('readline')
const {
  search,
  getPackageDetail,
  downloadDCCon
} = require('./util')

let downloadFolder

let data, result

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function q1 () {
  return new Promise((resolve, reject) => {
    rl.question('Download folder: ', (awnser) => {
      if (!(awnser.endsWith('/'))) {
        awnser = awnser + '/'
      }
    
      downloadFolder = awnser
      resolve()
    })
  })
}

function q2 () {
  return new Promise((resolve, reject) => {
    rl.question('Keyword: ', async (awnser) => {
      const searched = await search(awnser).then(res => res.json())
      data = searched.data
      result = searched.result
    
      if (result !== 'success') {
        console.log('Failed to connect')
        rl.close()
      }
    
      data.list.forEach(elem => {
        console.log(`${data.list.indexOf(elem)}) ${elem.title}`)
      })
      resolve()
    })
  })
}

function q3 () {
  return new Promise((resolve, reject) => {
    rl.question('Which DCCon will you download?: ', async (awnser) => {
      const dcCon = data.list[parseInt(awnser)]
      const code = dcCon.main_img_url.replace('//dcimg5.dcinside.com/dccon.php?no=', '')
      const packageDetail = await getPackageDetail(code).then(res => res.json())
  
      console.log(packageDetail)
      downloadDCCon(packageDetail, downloadFolder).then(() => {
        rl.close()
      })
      resolve()
    })
  })
}

(async () => {
  await q1()
  await q2()
  await q3()
})()
