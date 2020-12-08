require('dotenv').config()

const qiniu = require('qiniu')

const deployTargetToBucket = {
  DEV: 'shuotu-dev',
  PROD: 'shuotu-prod',
}

const mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESS_KEY, process.env.QINIU_SECRET_KEY)

console.log(mac)
